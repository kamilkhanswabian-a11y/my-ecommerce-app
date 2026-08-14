import { Star, Heart, HeartIcon } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Wishlistcontext } from '../Context/Whislistcontext';
import { Link } from 'react-router';
import Cards from './Cards';
import Button from './Button';
function Card({ data }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(Wishlistcontext);
  return (
          <li>
               {data.length === 0 && (
                   <h1 className='flex justify-center items-center text-black '>No product Founds...</h1>
               )}
               
               <Cards className="flex flex-col  gap-3 bg-gray-200 border border-gray-100 rounded-2xl relative">

  {/* Wishlist */}
  <div className="absolute right-2 top-2 z-10 text-white">
    <HeartIcon
      onClick={() => addToWishlist(data)}
      className={`w-6 h-6 cursor-pointer ${
        isInWishlist(data.id)
          ? "fill-red-600"
          : "bg-transparent text-white"
      }`}
    />
  </div>

  <Link to={`/Detail/${data.id}`} className="flex flex-col flex-1">

    <div className="flex flex-col gap-4 flex-1">

      {/* Image */}
      <img
        src={data.images[0]}
        alt={data.name}
        className="h-40 w-full object-cover rounded-md"
      />

      {/* Product name */}
      <div className="px-2 min-h-[48px]">
        <p className="font-serif text-black line-clamp-2">
          {data.name}
        </p>
      </div>

      {/* Brand + Category */}
      <div className="flex justify-between items-center px-2">

        <p className="font-serif text-black text-sm p-1">
          {data.brand}
        </p>

        <p className="font-serif text-black bg-white/50 text-sm p-1 rounded-full">
          {data.category}
        </p>

      </div>

      {/* Price + Rating */}
      <div className="flex justify-between items-center px-2">

        <p>
          $ {data.price}
        </p>

        <p className="font-serif text-yellow-100 bg-orange-300 text-sm rounded-full px-1">
          {Number(data.rating)}
        </p>

      </div>

       <div  className={`font-semibold pl-3 ${
      data.inStock ? "text-green-600" : "text-red-600"
    }`}>
            {data.inStock ? (<h1 className='text-green-800 font-semibold'>In Stock</h1>) : (<h1 className='text-red-800 font-semibold'>Out of Stock</h1>)}
      </div>
    </div>

  </Link>

  {/* Button */}
  <Button
    className="bg-black/50 text-white p-2 rounded-xl my-3 mx-5 mt-auto"
    onClick={() => addToCart(data)}
  >
    Add To Cart
  </Button>

</Cards>
               
          </li>
  );
}

export default Card;