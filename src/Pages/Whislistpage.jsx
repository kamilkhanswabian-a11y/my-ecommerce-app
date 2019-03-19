import { useContext } from "react";
import { Wishlistcontext } from "../Context/Whislistcontext";

function Whislistpage() {
  const { wishlist, addToWishlist } = useContext(Wishlistcontext);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {wishlist.length === 0 ? (
        // Rendered safely outside the ul element
        <p className="text-gray-500 text-center py-8">Your wishlist is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 justify-items-center">
          {wishlist.map((item) => (
            <li 
              key={item.id} 
              className="flex items-center gap-4 w-[400px] bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Product Image Thumbnail */}
              <div style={{ width: '64px', height: '64px' }} className="bg-gray-50 rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                <img 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>

              {/* Product Information Info Block */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                  {item.category}
                </p>
                <p className="text-base font-bold text-gray-900 mt-1">
                  ${item.price}
                </p>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => addToWishlist(item)} 
                className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                title="Remove from wishlist"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Whislistpage;