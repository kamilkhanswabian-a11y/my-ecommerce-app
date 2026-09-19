
import { useContext, createContext, useState, useEffect ,useRef } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(()=> {
      const persist = localStorage.getItem("cart");
      return persist ? JSON.parse(persist) : []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLoadedCart = useRef(false);
  const STORAGE_KEY = "cart";

  const getGuestCart = () => {
    try {
      const persistedCart = localStorage.getItem(STORAGE_KEY);
      if (!persistedCart) return [];
      const savedCart = JSON.parse(persistedCart);
      return Array.isArray(savedCart) ? savedCart : [];
    } catch (err) {
      setError(err.message || "Can't load cart from storage");
      return [];
    }
  };


  const saveGuestCart = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      setError(err.message || "Can't save cart");
    }
  };
   
   useEffect(() => {
  if (!hasLoadedCart.current) return;

  if (!user) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );
  }
}, [cart, user]);



  const fetchServerCart = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: serverError } = await supabase
        .from("cart_items")
        .select(`
               id,
              quantity,
              products_id,
              products (
              id,
              name,
              price,
              images,
              brand,
              category
    ) 
          `)
        .eq("user_id", userId);
       console.log(data);
        console.log("ERROR:", serverError);
      if (serverError) throw serverError;
      return data ?? [];
    } catch (err) {
      setError(err.message || "Can't fetch cart from Server");
      return [];
    } finally {
      setLoading(false);
    }
  };

      // const dataaaa = fetchServerCart()
      // console.log(dataaaa);
      
  const mergeGuestCart = async (userId) => {
    try {
      setLoading(true);
      const { data: existingItems, error: existingItemError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId);

      if (existingItemError) throw existingItemError;

      const mergedList = [...(existingItems || [])];
      const guestCart = getGuestCart();

      // Fix: Use for...of instead of for...in for arrays
      for (const guestItem of guestCart) {
        const guestProdId = guestItem.product_id || guestItem.id;
        const existingItem = mergedList.find(
          (item) => item.products_id === guestProdId
        );

        if (existingItem) {
          existingItem.quantity += guestItem.quantity;
        } else {
          mergedList.push({
            user_id: userId,
            products_id: guestProdId,
            quantity: guestItem.quantity,
          });
        }
      }

      // Clear existing records from server to avoid conflict issues on merge
      const { error: deleteError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      if (deleteError) throw deleteError;

      if (mergedList.length > 0) {
        const rowsToInsert = mergedList.map((item) => ({
          user_id: userId,
          products_id: item.products_id,
          quantity: item.quantity,
        }));

        // Fix: Chain .insert directly on .from() without .eq()
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert(rowsToInsert);

        if (insertError) throw insertError;
      }

      localStorage.removeItem(STORAGE_KEY);
      return mergedList;
    } catch (err) {
      setError(err.message || "Failed to merge cart");
      return [];
    } finally {
      setLoading(false);
    }
  };
  

 useEffect(() => {
  const loadCart = async () => {
    setLoading(true);

    const guestCart = getGuestCart();

    console.log("GUEST CART:", guestCart);

    if (!user) {
      setCart(guestCart);

      hasLoadedCart.current = true;

      setLoading(false);
      return;
    }

    if (guestCart.length > 0 && user) {
      const mergedData = await mergeGuestCart(user.id);

      setCart(mergedData);
    } else {
      const serverCart = await fetchServerCart(user.id);

      setCart(serverCart);
    }

    hasLoadedCart.current = true;
  };

  loadCart();
}, [user]);





  const addToCart = async(product) => {
         
            if(!user) {
              setCart((prev)=> {
                  const existingItem = prev.find((item)=> (
                      item.id === product.id
                  ))

                  if(existingItem){
                    return prev.map((item)=>  (
                         item.id === product.id ? {...item , quantity:item.quantity + 1} : item
                    ))
                  }
                  return [...prev , {...product, quantity : 1}]
              })
              return
        }
 
        const {data: existingItem , error :existingItemError} = await supabase
        .from("cart_items")
        .select()
        .eq("products_id" ,product.id)
        .eq("user_id" ,user.id)
        .maybeSingle();
        
        if(existingItemError) {
           throw existingItemError
        }

        if(!existingItem){
              const {error : insertItemError} = await supabase
              .from("cart_items")
              .insert({
                 user_id: user.id,
                 products_id: product.id,
                 quantity: 1,
              })

              if(insertItemError){
                throw insertItemError
              }
        }else{
               const {error : updateError} = await supabase
              .from("cart_items")
              .update({
                 products_id: product.id,
                 quantity: existingItem.quantity + 1,
              })
              .eq("user_id" ,user.id)
              .eq("products_id", existingItem.products_id)
              if(updateError){
                throw updateError
              }
        }

        const serverCart = await fetchServerCart(user.id);
         setCart(serverCart);
         
  }


 const deletfromCart  =  async(id) => {
     if(!user){
       setCart((prev) => (
         prev.filter((item)=>  item.id !== id)
       ))
     }
     try {
          setLoading(true);
          setError(null)
          const {error:deleteError} =  await supabase
          .from("cart_items")
          .delete()
          .eq("user_id",user.id)
          .eq("products_id",id)
             setCart((prev) =>
             prev.filter((item) => item.products_id !== id)
    );
          if(deleteError){
            setError(deleteError)
          }
     } catch (error) {
       setError(error.message)
     }finally{
       setLoading(false)
     }
     
 }

 const incQty = async (id) => {
  if (!user) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const currentItem = cart.find(
      (item) => item.products_id === id
    );

    if (!currentItem) return;

    const { error: incQtyError } = await supabase
      .from("cart_items")
      .update({
        quantity: currentItem.quantity + 1,
      })
      .eq("user_id", user.id)
      .eq("products_id", id);

    if (incQtyError) {
      throw incQtyError;
    }

    // Update UI immediately
    setCart((prev) =>
      prev.map((item) =>
        item.products_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


 const decQty = async (id) => {
  if (!user) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const currentItem = cart.find(
      (item) => item.products_id === id
    );

    if (!currentItem) return;
     if (currentItem.quantity === 1){ 
         await deletfromCart(id);
         return;
      }
    const { error: incQtyError } = await supabase
      .from("cart_items")
      .update({
        quantity: currentItem.quantity - 1,
      })
      .eq("user_id", user.id)
      .eq("products_id", id);

    if (incQtyError) {
      throw incQtyError;
    }

    // Update UI immediately
    setCart((prev) =>
      prev.map((item) =>
        item.products_id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) =>  item.quantity > 0)
    );
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


const totalprice = cart.reduce((total,item)=>{
      return total = item.quantity * item.products.price
},0)

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        setCart,
        saveGuestCart,
        deletfromCart,
        incQty,
        decQty,
        totalprice,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}