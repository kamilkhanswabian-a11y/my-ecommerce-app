// import { useContext, useRef } from "react";
// import { createContext, useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import { supabase } from "../supabaseClient";

// export const CartContext = createContext();
// export function CartProvider({ children }) {
//   const { user } = useContext(AuthContext);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cartitem, setcartitem] = useState([]);
//   const initRef = useRef(null);
 
//   const STORAGE_KEY = "cart";
 
//   //-----------------------------------------  Get Guest Cart  -----------------------------------------
 
//   function getGuestCart() {
//     try {
//       const savedCart = localStorage.getItem(STORAGE_KEY);
//       if (!savedCart) {
//         return [];
//       }
 
//       const parsedCart = JSON.parse(savedCart);
//       return Array.isArray(parsedCart) ? parsedCart : [];
//     } catch (error) {
//       console.log("Failed to read cart ", error);
//       return [];
//     }
//   }
 
//   //-----------------------------------------  Save Guest Cart  -----------------------------------------
 
//   function saveGuestCart(cart) {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
//     } catch (error) {
//       console.log("failed to save cart", error);
//     }
//   }
 
//   //-----------------------------------------  Get Server Cart  -----------------------------------------
 
//   async function fetchServerCart(userId) {
//     const { data, error: fetchError } = await supabase
//       .from("cart_items")
//       .select()
//       .eq("user_id", userId)
//       .order("created_at", {
//         ascending: true,
//       });
//     if (fetchError) {
//       throw fetchError;
//     }
//     return data ?? [];
//   }
 
//   //-----------------------------------------  Merge Guest Cart  -----------------------------------------
 
//   async function mergeGuestCart(user) {
//     const guestCart = getGuestCart();
//     if (guestCart.length === 0) {
//       return;
//     }
 
//     const { data: serverCart, error: fetchError } = await supabase
//       .from("cart_items")
//       .select()
//       .eq("user_id", user.id);
//     if (fetchError) {
//       throw fetchError;
//     }
 
//     const merged = serverCart
//       ? serverCart.map((item) => ({
//           ...item,
//         }))
//       : [];
 
//     for (const guestItem of guestCart) {
//       let existingItem = merged.find(
//         (item) => item.product_id === guestItem.product_id
//       );
 
//       if (existingItem) {
//         existingItem.quantity += guestItem.quantity;
//       } else {
//         merged.push({
//           user_id: user.id,
//           product_id: guestItem.product_id,
//           quantity: guestItem.quantity,
//         });
//       }
//     }
 
//     const { error: deleteError } = await supabase
//       .from("cart_items")
//       .delete()
//       .eq("user_id", user.id);
//     if (deleteError) {
//       throw deleteError;
//     }
 
//     if (merged.length > 0) {
//       const rows = merged.map((item) => ({
//         user_id: user.id,
//         product_id: item.product_id,
//         quantity: item.quantity,
//       }));
 
//       const { error: insertError } = await supabase
//         .from("cart_items")
//         .insert(rows);
//         if (insertError) {
//         throw insertError;
//       }
//     }
 
//     localStorage.removeItem(STORAGE_KEY);
//   }
 
//   //-----------------------------------------  Load Cart  -----------------------------------------
 
//   async function loadCart(user) {
//     setLoading(true);
//     setError(null);
 
//     try {
//       if (!user) {
//         const guestCart = getGuestCart();
//         setcartitem(guestCart);
//         return;
//       }
 
//       const guestCart = getGuestCart();
//       if (guestCart.length > 0) {
//         await mergeGuestCart(user);
//       }
 
//       const serverCart = await fetchServerCart(user.id);
//       setcartitem(serverCart);
//     } catch (err) {
//       console.log(err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }
 
//    useEffect(() => {
//     loadCart(user);
//   }, [user]);
 
//   useEffect(() => {
//     if (!user) {
//       saveGuestCart(cartitem);
//     }
//   }, [user, cartitem]);
 
 
//   //-----------------------------------------  Add To Cart  -----------------------------------------
 
//   const addToCart = async (product) => {
//     console.log(product);
 
//     if (!user) {
//       setcartitem((prev) => {
//         const existingItem = prev.find((item) => item.id === product.id);
//         if (existingItem) {
//           return prev.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           );
//         }
//         return [
//           ...prev,
//           {
//             id: `guest-${product.id}`,
//             product_id: product.id,
//             quantity: 1,
//             product,
//           },
//         ];
//       });
//       return;
//     }
 
//     try {
//       const { data: existingItem, error: findError } = await supabase
//         .from("cart_items")
//         .select()
//         .eq("user_id", user.id)
//         .eq("product_id", product.id)
//         .maybeSingle();
//       if (findError) {
//         throw findError;
//       }
 
//       if (!existingItem) {
//         const { error: insertError } = await supabase
//           .from("cart_items")
//           .insert({
//             user_id: user.id,
//             product_id: product.id,
//             quantity: 1,
//           });
//         if (insertError) {
//           throw insertError;
//         }
//       } else {
//         const { error: updateError } = await supabase
//           .from("cart_items")
//           .update({
//             quantity: existingItem.quantity + 1,
//             updated_at: new Date().toISOString(),
//           })
//           .eq("user_id", user.id)
//           .eq("id", existingItem.id);
//         if (updateError) {
//           throw updateError;
//         }
//       }
 
//       // Keep local state in sync after a successful server write
//       const serverCart = await fetchServerCart(user.id);
//       setcartitem(serverCart);
//     } catch (error) {
//       console.log(error);
//       setError(error);
//     }
//   };

//   //-----------------------------------------  Increase Cart Quantity -----------------------------------------

//     const incQty = async(id) =>{
    
//       if(!user) {
//             setcartitem((prev) =>
//                  prev.map((item) =>
//                  item.id === id ? { ...item, Quantity: item.Quantity + 1 } : item,
//       ),
//     );
//       }else{ 
//            const {data:cartitem,error:incQtyError} = await supabase
//            .from("cart_items")
//            .update({
//                quantity : cartitem.quantity + 1,
//                updated_at : new Date().toISOString(),
//            })
//            .eq("user_id",user.id)
//            .eq("products_id",cartitem.id)
          
//            if(incQtyError){
//              throw incQtyError
//            }
//       }
      
//     }
 

//   //-----------------------------------------  Decrease Cart Quantity -----------------------------------------


//     const decQty = async(id) => {
       
//       if(!user){
//                setcartitem((prev) =>
//                prev.map((item) =>
//                 item.id === id ? { ...item, Quantity: item.Quantity - 1 } : item,
//               ).filter((item) => item.Quantity > 0),
//     );
//       }else{
//              const { data:cartitem, error: decQtyError } = await supabase
//              .from("cart_items")
//              .update({
//                   quantity : cartitem.quantity - 1,
//                   updated_at : new Date().toISOString(),
//              })

//              if(decQtyError){
//               throw decQtyError
//              }
//       }
      

//     }
    

//   //-----------------------------------------  DeletfromCart  -----------------------------------------

//   const deletfromCart = async(id) => {
//     if(!user){
//       setcartitem((prev) => prev.filter((item) => item.id !== id));
//     }else{
//           const { error:deletfromCart} = await supabase
//           .from("cart_items")
//           .delete()
//           .eq("userId",user.id)
//           .eq("id",id)
//           if(deletfromCart){
//             throw deletfromCart
//           }
//     }
//   };

  
//   const totalprice = cartitem.reduce(
//     (total, item) => (total = total + item.price * item.Quantity),
//     0,
//   );

//   const totalQuantity = cartitem.reduce(
//     (total, item) => (total = total + item.Quantity),
//     0,
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartitem,
//         addToCart,
//         incQty,
//         decQty,
//         deletfromCart,
//         totalprice,
//         totalQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }



import { useContext, useRef } from "react";
import { createContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export const CartContext = createContext();
export function CartProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
 
   const STORAGE_KEY = "cart";

   const getGuestCart = () => { 
       try {
              const persistedCart = localStorage.getItem(STORAGE_KEY);
              
              if(!persistedCart) { return }
             const savedCart = JSON.parse(persistedCart)
             return Array.isArray(savedCart) ?  savedCart : [];

       } catch (error) {
         setError(error.massage , "can't load cart from storage");
       }
   } 
 

   const saveGuestCart = (cart) => {
            try {
           
                   return localStorage.setItem(STORAGE_KEY,JSON.stringify(cart))

            } catch (error) {
               setError(error,"can't save cart")
            }
   }
    
  const fetchServerCart = async(userId) => {
           setLoading(true)
           setError(null)
           try {
                   const {data, error :serverError } = await supabase
                   .from("cart_items")
                   .select("*")
                   .eq("user_id",userId)
                   if(serverError){
                    throw serverError
                   }

                   return data ?? [];
           } catch (error) {
               setError(error,"Can't fetch cart from Server")
           }
  }

  
  
 
  
  return (
    <CartContext.Provider
      value={{
        // cart,
        // addToCart,
        // incQty,
        // decQty,
        // deletfromCart,
        // totalprice,
        // totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
