import { useContext } from "react";
import { Wishlistcontext } from "../Context/Whislistcontext";
import {  X } from 'lucide-react'
import { CartContext } from "../Context/Cartcontext";
function Whislistpage() {
  const { wishlist, addToWishlist } = useContext(Wishlistcontext);
  const {addToCart} = useContext(CartContext)
  return (
    <div className="max-w-6xl mt-5 mx-auto px-3 py-4">
      <h1 className="font-semibold text-2xl p-4 pb-4 border-b-2">
        My Cart ({wishlist.length})
      </h1>
      <div>
        {wishlist.length === 0 ? (
          <h1 className="text-clip font-bold  flex items-center justify-center ">NO ITEM IN CART</h1>
        ) : (
          <div>
            {wishlist.map((item) => (
              <div key={item.id} className="grid grid-cols-1 gap-2 py-4 items-center border-b md:grid-cols-8">
                <img src={item.images[0]} alt={item.name} className="md:col-span-1 w-28 h-28 object-cover rounded-md" />
                <h1 className="md:col-span-1">
                  {item.category}
                </h1>
                <h1 className="md:col-span-2">
                  {item.name}
                </h1>
                <h1 className="md:col-span-1">
                  $ {item.price}
                </h1>
                <div className="md:col-span-1">
                  <span>{item.inStock ? (<h1 className="text-green-700 font-semibold">In Stock</h1>) : (<h1 className="text-red-700 font-semibold">Out Of Stock</h1>)}</span>
                </div>
                <div className="flex justify-between sm:pr-4 md:gap-6 md:col-span-2 mt-2">
                  <button className="text-white bg-black py-1 px-3  md:min-w-[110px]"
                  onClick={()=> addToCart(item)}
                  >
                    Add To Cart
                  </button>
                  <button onClick={()=> addToWishlist(item)}>
                    <X />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Whislistpage;