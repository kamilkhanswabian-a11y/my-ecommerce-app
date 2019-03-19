import { createContext, useState } from "react";

export const Wishlistcontext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id == item.id);
      if (exists) {
        return prev.filter((i) => i.id != item.id);
      }
      return [...prev, item];
    });
  };

 const isInWishlist = (id) => {
       return wishlist.some((item)=> item.id === id)
 }

 const totalQuantity = wishlist.reduce((total)=>{
           
           return total + 1;
 },0)
 
  return (
    <Wishlistcontext.Provider value={{ wishlist, addToWishlist,isInWishlist,totalQuantity }}>
      {children}
    </Wishlistcontext.Provider>
  );
}

