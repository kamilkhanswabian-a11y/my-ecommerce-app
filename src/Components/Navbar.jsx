import { useState } from "react"
import Cart from "./Cart"
import Links from "./Links"
import Logo from "./Logo"
import Search from "./Search"
import Signupbutton from "./Signupbutton"
import Users from "./Users"
import Wishlist from "./Wishlist"
import { Menu, X } from 'lucide-react';
import Darkmode from "../SmallComponents/Darkmode"

function Navbar() {
  const [open, setopen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between h-[60px] w-full bg-slate-50 px-4 shadow-md">
        <div className="flex items-center">
          <Logo></Logo>
          <div className="hidden md:flex ml-5">
            <Links/> 
          </div>   
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex">
            <Search ></Search>
          </div>
          <Wishlist></Wishlist>
          <Cart></Cart>
          <Users/>

          <div className="hidden md:flex">
            <Signupbutton></Signupbutton>
          </div>
          <div>
            {/* Hamburger Menu Button */}
            <button onClick={() => setopen(!open)} className="md:hidden flex"> 
              {open ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
      </nav> 
    
      {/* Mobile Responsive Dropdown Menu */}
      {open && (
        <>
          {/* FIX: Added md:hidden right here to the main container */}
          <div className="md:hidden flex flex-col gap-4 p-3 sticky top-[60px] left-0 z-40 bg-slate-100 w-full shadow-lg border-b border-gray-200">
            <div className="flex justify-end">
              <Search></Search>
            </div>
            <Links></Links>
            <div className="flex justify-between items-center">
              <Signupbutton></Signupbutton>
              <Users/>
              <Darkmode/>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar

