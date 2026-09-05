import {
createContext,
useContext,
useEffect,
useRef,
useState,
} from "react";

import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

const STORAGE_KEY = "cart";

/\*
We use this select everywhere when loading
authenticated cart items.

cart_items.product_id
↓
products.id
\*/
const CART_SELECT = `  id,
  user_id,
  product_id,
  quantity,
  created_at,
  updated_at,
  product:products (
    id,
    name,
    price,
    image,
    stock
  )`;

export function CartProvider({ children }) {
/\*
IMPORTANT:

    We are NOT getting the user from Supabase here.

    Your AuthContext already handles:
    - getSession()
    - onAuthStateChange()
    - signIn()
    - signOut()
    - user

\*/

const { user } = useContext(AuthContext);

const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

/_
Prevent unnecessary initialization
for the same user.
_/
const initializedUserRef = useRef(null);

// ==================================================
// GUEST CART HELPERS
// ==================================================

function getGuestCart() {
try {
const savedCart = localStorage.getItem(STORAGE_KEY);

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (err) {
      console.error("Failed to read guest cart:", err);

      return [];
    }

}

function saveGuestCart(items) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
} catch (err) {
console.error("Failed to save guest cart:", err);
}
}

// ==================================================
// FETCH AUTHENTICATED CART + PRODUCTS
// ==================================================

async function fetchServerCart(userId) {
const { data, error: fetchError } = await supabase
.from("cart_items")
.select(CART_SELECT)
.eq("user_id", userId)
.order("created_at", { ascending: true });

    if (fetchError) {
      throw fetchError;
    }

    return data ?? [];

}

// ==================================================
// MERGE GUEST CART → SUPABASE
// ==================================================

async function mergeGuestCart(currentUser) {
const guestCart = getGuestCart();

    // Nothing to merge
    if (guestCart.length === 0) {
      return;
    }

    // ------------------------------------------
    // Get existing server cart
    // ------------------------------------------

    const { data: serverCart, error: fetchError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", currentUser.id);

    if (fetchError) {
      throw fetchError;
    }

    // Copy server cart
    const merged = serverCart
      ? serverCart.map((item) => ({ ...item }))
      : [];

    // ------------------------------------------
    // Merge each guest item
    // ------------------------------------------

    for (const guestItem of guestCart) {
      const existingItem = merged.find(
        (item) => item.product_id === guestItem.product_id
      );

      // Product already exists
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      }

      // Product doesn't exist
      else {
        merged.push({
          user_id: currentUser.id,
          product_id: guestItem.product_id,
          quantity: guestItem.quantity,
        });
      }
    }

    // ------------------------------------------
    // Delete old server cart
    // ------------------------------------------

    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", currentUser.id);

    if (deleteError) {
      throw deleteError;
    }

    // ------------------------------------------
    // Insert merged cart
    // ------------------------------------------

    if (merged.length > 0) {
      const rows = merged.map((item) => ({
        user_id: currentUser.id,
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const { error: insertError } = await supabase
        .from("cart_items")
        .insert(rows);

      if (insertError) {
        throw insertError;
      }
    }

    /*
      Only remove localStorage AFTER the
      server operation succeeded.
    */
    localStorage.removeItem(STORAGE_KEY);

}

// ==================================================
// LOAD CART
// ==================================================

async function loadCart(currentUser) {
setLoading(true);
setError(null);

    try {
      // ========================================
      // GUEST
      // ========================================

      if (!currentUser) {
        const guestCart = getGuestCart();

        setCartItems(guestCart);

        return;
      }

      // ========================================
      // AUTHENTICATED
      // ========================================

      const guestCart = getGuestCart();

      /*
        If the user just logged in and has
        a guest cart, merge it first.
      */
      if (guestCart.length > 0) {
        await mergeGuestCart(currentUser);
      }

      /*
        Now get the final cart including
        related product information.
      */
      const serverCart = await fetchServerCart(currentUser.id);

      setCartItems(serverCart);
    } catch (err) {
      console.error("Failed to load cart:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }

}

// ==================================================
// AUTH USER CHANGE
// ==================================================

useEffect(() => {
const currentUserId = user?.id ?? "guest";

    /*
      Avoid loading the same user's cart
      repeatedly.
    */
    if (initializedUserRef.current === currentUserId) {
      return;
    }

    initializedUserRef.current = currentUserId;

    loadCart(user);

}, [user?.id]);

// ==================================================
// SAVE GUEST CART TO LOCAL STORAGE
// ==================================================

useEffect(() => {
/\*
Only save to localStorage for guests.

      Authenticated cart lives in Supabase.
    */
    if (!user && !loading) {
      saveGuestCart(cartItems);
    }

}, [cartItems, user, loading]);

// ==================================================
// ADD TO CART
// ==================================================

async function addToCart(product) {
setError(null);

    // ========================================
    // GUEST
    // ========================================

    if (!user) {
      setCartItems((previous) => {
        const existingItem = previous.find(
          (item) => item.product_id === product.id
        );

        // Already exists
        if (existingItem) {
          return previous.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        // New item
        return [
          ...previous,
          {
            id: `guest-${product.id}`,
            product_id: product.id,
            quantity: 1,
            product,
          },
        ];
      });

      return;
    }

    // ========================================
    // AUTHENTICATED
    // ========================================

    setLoading(true);

    try {
      /*
        Check whether this product already
        exists in this user's cart.
      */
      const { data: existingItem, error: findError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (findError) {
        throw findError;
      }

      // --------------------------------------
      // Product NOT in cart
      // --------------------------------------

      if (!existingItem) {
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1,
          });

        if (insertError) {
          throw insertError;
        }
      }

      // --------------------------------------
      // Product already in cart
      // --------------------------------------

      else {
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id)
          .eq("user_id", user.id);

        if (updateError) {
          throw updateError;
        }
      }

      /*
        Reload cart so the state contains
        the related product object.
      */
      const updatedCart = await fetchServerCart(user.id);

      setCartItems(updatedCart);
    } catch (err) {
      console.error("Add to cart failed:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }

}

// ==================================================
// UPDATE QUANTITY
// ==================================================

async function updateQuantity(cartItemId, quantity) {
setError(null);

    // --------------------------------------
    // Quantity <= 0 → remove
    // --------------------------------------

    if (quantity <= 0) {
      await removeFromCart(cartItemId);

      return;
    }

    // ========================================
    // GUEST
    // ========================================

    if (!user) {
      setCartItems((previous) =>
        previous.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );

      return;
    }

    // ========================================
    // AUTHENTICATED
    // ========================================

    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({
          quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cartItemId)
        .eq("user_id", user.id);

      if (updateError) {
        throw updateError;
      }

      const updatedCart = await fetchServerCart(user.id);

      setCartItems(updatedCart);
    } catch (err) {
      console.error("Update quantity failed:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }

}

// ==================================================
// REMOVE FROM CART
// ==================================================

async function removeFromCart(cartItemId) {
setError(null);

    // ========================================
    // GUEST
    // ========================================

    if (!user) {
      setCartItems((previous) =>
        previous.filter((item) => item.id !== cartItemId)
      );

      return;
    }

    // ========================================
    // AUTHENTICATED
    // ========================================

    setLoading(true);

    try {
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId)
        .eq("user_id", user.id);

      if (deleteError) {
        throw deleteError;
      }

      const updatedCart = await fetchServerCart(user.id);

      setCartItems(updatedCart);
    } catch (err) {
      console.error("Remove from cart failed:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }

}

// ==================================================
// CLEAR CART
// ==================================================

async function clearCart() {
setError(null);

    // ========================================
    // GUEST
    // ========================================

    if (!user) {
      setCartItems([]);

      localStorage.removeItem(STORAGE_KEY);

      return;
    }

    // ========================================
    // AUTHENTICATED
    // ========================================

    setLoading(true);

    try {
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        throw deleteError;
      }

      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }

}

// ==================================================
// TOTAL ITEMS
// ==================================================

const totalItems = cartItems.reduce(
(total, item) => total + item.quantity,
0
);

// ==================================================
// TOTAL PRICE
// ==================================================

const totalPrice = cartItems.reduce((total, item) => {
const price = Number(item.product?.price) || 0;

    return total + price * item.quantity;

}, 0);

// ==================================================
// PROVIDER
// ==================================================

return (
<CartContext.Provider
value={{
State
cartItems,
loading,
error,

         CRUD
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,

        // Calculations
        totalItems,
        totalPrice,

        // Error control
        setError,

        // Useful UI flag
        isAuthenticated: Boolean(user),
 z     }}
    >
      {children}
    </CartContext.Provider>

);
}

 ==================================================
 CUSTOM HOOK
 ==================================================

export function useCart() {
const context = useContext(CartContext);

if (!context) {
throw new Error("useCart must be used inside CartProvider");
}

return context;
}
