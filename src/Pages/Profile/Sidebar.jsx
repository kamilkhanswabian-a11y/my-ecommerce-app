import React, { useContext, useState } from 'react'
import {User, Mail,ShieldCheck,Calendar,LogOut,ShoppingBag,Heart,
        ShoppingCart, MapPin,Settings, Lock, ChevronRight, Package,
         CreditCard,Edit3, Menu, X,
         Icon,
         ImageUp, } from 'lucide-react'
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
 
    const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: User,
    path: "",
  },
  {
    id: "orders",
    label: "My Orders",
    icon: Package,
    path: "orders",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    path: "wishlist",
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    path: "addresses",
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: Settings,
    path: "settings",
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
    path: "security",
  },
];

function Sidebar() {
  const {signOut,profile,uploadAvatar} =useContext(AuthContext)
  console.log(profile);
  
async  function handleAvatarChange(e) {
     let file  = e.target.files[0];
     if(!file)  return;
     
     try {
       await uploadAvatar(file)
     } catch (error) {
      console.log(error);
     } 
  }
 async function handle_Submit() {
          await signOut()
 }
  return (
    <div className='border border-black/20 rounded-xl py-8 mx-1 overflow-y-auto '>
            <div className='flex  gap-3 px-3 mt-5'>
                  <img  alt="" src={profile?.avatar_url || "no url"} className= 'w-12 rounded-full flex items-center justify-center px-1 py-2'/>
                  <div className='mt-2 items-center'>
                         <div className='flex gap-1'>
                              <h1>{profile?.firstname || 'Uploade Photo'}</h1>
                              <h1>{profile?.lastname || ''}</h1>
                         </div>
                         <input type="file"
                          accept="image/*"
                         onChange={handleAvatarChange}
                         /> 
                  </div>
            </div>
            <div className='mt-8'>
                {menuItems.map((item)=> {
                    const Icon = item.icon
                    return (
                             <NavLink
                              key={item.id}
                              to={item.path}
                              end={item.path === ""}
                              className={({ isActive }) =>
                              `w-full flex gap-2 py-3 px-4 mt-2 ${
                              isActive
                              ? "bg-black text-white"
                              : "hover:bg-gray-200"
                            }`
              }
            >
              <Icon />
              <p>{item.label}</p>
            </NavLink>
                    )
                })}
                 <div className='flex items-center justify-center rounded-md bg-black text-white  py-3 mt-8 mx-5'>
                 <div >
                        <button className='flex items-center gap-2'>
                            <LogOut size={20}/>
                        <div onClick={handle_Submit}>
                              Log Out    
                        </div>
                        </button>
                 </div>
            </div>
            </div>
    </div>
  )
}

export default Sidebar