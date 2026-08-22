import { ShoppingCart } from "lucide-react"
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from "../Context/Cartcontext";

function Cart() {
  const {totalQuantity} = useContext(CartContext)
  return (
    <div>
      <Link to="/cart">
      <button title="Cart" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <div className="relative">
        <ShoppingCart size={20} color="#333" />
        <div className="flex items-center justify-center absolute top-[-16px] left-2">
            <span className="rounded-full px-1 py-0.5 text-xs font-medium text-white bg-black/70 ">{totalQuantity}</span>
        </div>
        </div>
      </button>
      </Link>
    </div>
  )
}

export default Cart