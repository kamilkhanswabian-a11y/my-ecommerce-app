import { Heart } from "lucide-react"
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Wishlistcontext } from "../Context/Whislistcontext";
function Wishlist() {
   const {totalQuantity} = useContext(Wishlistcontext)
  return (
    <div>
      <Link to="/whislist">
      <button title="Wishlist" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <div >
               <Heart size={25} color="#333" />
                <h1 className="hidden">{totalQuantity}</h1>
        </div>
      </button>
      </Link>
    </div>
  )
}

export default Wishlist