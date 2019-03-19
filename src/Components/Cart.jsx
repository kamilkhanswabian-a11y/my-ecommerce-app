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
        <ShoppingCart size={24} color="#333" />
        <div className="absolute top-[-15px] right-0">
            <span>{totalQuantity}</span>
        </div>
        </div>
      </button>
      </Link>
    </div>
  )
}

export default Cart