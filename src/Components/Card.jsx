import { Star, Heart } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Wishlistcontext } from '../Context/Whislistcontext';
import { Link } from "react-router";

function Card({ data }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(Wishlistcontext);

  // Safely check wishlist status
  const isWishlisted = typeof isInWishlist === 'function' 
    ? isInWishlist(data?.id) 
    : Boolean(isInWishlist);

  // Stop link navigation when clicking heart
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(data);
  };

  if (!data) return null;

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 list-none">
      
      {/* Product Image & Link */}
      <Link to={`/Detail/${data.id}`}>
        <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden aspect-square">
          <img 
            src={data.images?.[0] || data.image} 
            alt={data.name || data.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 z-10"
          >
            <Heart
              size={18}
              className={`transition-colors duration-300 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Category Badge */}
          {data.category && (
            <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
              {data.category}
            </span>
          )}
        </div>
      </Link>
      
      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug min-h-[40px] group-hover:text-indigo-600 transition-colors duration-200">
          {data.name || data.title}
        </h3>

        {/* Color Options */}
        {data.colors && data.colors.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {data.colors.slice(0, 5).map((color, index) => (
              <span
                key={index}
                className="inline-block h-5 w-5 rounded-full border border-gray-200 ring-1 ring-white shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {data.colors.length > 5 && (
              <span className="text-[10px] font-medium text-gray-400 self-center">
                +{data.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Price & Rating */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Price</span>
            <p className="text-xl font-extrabold text-slate-900">${data.price}</p>
          </div>
          
          {data.rating && (
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-800">{data.rating}</span>
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button 
          type="button"
          onClick={() => addToCart(data)} 
          className="mt-3 w-full bg-slate-900 hover:bg-indigo-600 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-indigo-200 hover:shadow-lg active:scale-[0.98] transform"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
}

export default Card;