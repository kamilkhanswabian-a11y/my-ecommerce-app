import { useContext } from "react"
import { Link } from "react-router"
import { AuthContext } from "../Context/AuthContext"

function Links() {
  const {profile} =useContext(AuthContext)
  console.log('profile:', profile);
  console.log('full profile object:', JSON.stringify(profile));
  return (
      <> 
          <ul className=" md:flex gap-5">
                  <li className="hover:underline">
                   <Link to="/"> 
                         Home
                   </Link> 
                   </li>
                  <li className="hover:underline">
                    <Link to="/products"> 
                         Products
                   </Link> 
                  </li>
                  <li className="hover:underline">
                    <Link to='/Profile/orders'>
                            Orders
                    </Link>
                  </li>
                  <li className="hover:underline">
                         {profile?.role === 'admin' && (
                           <Link>
                                  Admin
                           </Link>
                         )}
                  </li>
          </ul>   
      </>
  )
}

export default Links