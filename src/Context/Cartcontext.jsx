import { createContext, useState,useEffect } from "react";

export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartitem, setcartitem] = useState(()=> {
     const saved = localStorage.getItem("Cart");
     return saved ? JSON.parse(saved) : [] ;
  })
 
  useEffect(() => {
      localStorage.setItem("Cart",JSON.stringify(cartitem));
    }, [cartitem])

  const addToCart = (product) => { 
    
    setcartitem((prev) => {
      const exists = prev.find((item) => item.id === product.id)

      if (exists) {
        return prev.map((item) => item.id === product.id ? { ...item, Quantity: item.Quantity + 1 } : item)
      }
      return [...prev, { ...product, Quantity: 1 }]
    })
  }

  const incQty = (id) => {
    setcartitem((prev) => prev.map((item) => (
      item.id === id ? { ...item, Quantity: item.Quantity + 1 } : item
    )))
  }

  const decQty = (id) => {
    setcartitem((prev) => prev.map((item) => (
      item.id === id ? { ...item, Quantity: item.Quantity - 1 } : item
    )).filter((item) => item.Quantity > 0))
  }


  const deletfromCart = (id) => {
    setcartitem((prev) => prev.filter((item) => item.id !== id))
  }


  const totalprice = cartitem.reduce((total, item) => (
    total = total + item.price * item.Quantity
  ), 0)

  const totalQuantity = cartitem.reduce((total, item) => (
    total = total + item.Quantity
  ), 0)


  return (

    <CartContext.Provider
      value={{
        cartitem,
        addToCart,
        incQty,
        decQty,
        deletfromCart,
        totalprice,
        totalQuantity
           }}>
      {children}
    </CartContext.Provider>
  );
}