import { Link } from "react-router"

function Links() {
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
                  <li className="hover:underline">Contacts</li>
                  <li className="hover:underline">Blog</li>
          </ul>   
      </>
  )
}

export default Links