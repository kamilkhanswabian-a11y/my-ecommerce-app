import { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Plus, Minus, Trash2 } from 'lucide-react';
function Cartpage() {
         const { cartitem ,deletfromCart,decQty,incQty } = useContext(CartContext);
        
  return (
            <>
            <div>CART {cartitem.length}</div>
                   {cartitem.length=== 0 && <h1 className='h-screen flex justify-center items-center'>No Item in Cart</h1> }
                  <ul className="grid grid-cols-1 gap-4 max-w-2xl mx-auto p-4">
    {cartitem.map((item) => (
      <li 
        key={item.id} 
        className="flex items-center gap-4 w-[400px] bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* 1. Product Image Thumbnail */}
        <div style={{ width: '64px', height: '64px' }} className="w-16 h-20 bg-gray-50 rounded-lg p-1 flex items-center justify-center flex-shrink-0">
          <img 
           style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            src={item.image} 
            alt={item.title} 
            className="max-h-full max-w-full object-contain" 
          />
        </div>

        {/* 2. Product Information Info Block */}
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

        {/* 3. Interactive Action Controls Box */}
        <div className="flex items-center gap-4">
          {/* Simple Plus/Minus Counter */}
          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
            <button onClick={()=> decQty(item.id)}
              className="p-1.5 hover:bg-gray-200 text-gray-500 transition-colors"
              title="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {item.Quantity}
            </span>
            <button onClick={()=> incQty(item.id)}
              className="p-1.5 hover:bg-gray-200 text-gray-500 transition-colors"
              title="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Delete Row Icon */}
          <button onClick={()=> deletfromCart(item.id)}
            className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </li>
    ))}
  </ul>

            </>
  )
}

export default Cartpage