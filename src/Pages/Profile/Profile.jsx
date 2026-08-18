import {User, Mail,ShieldCheck,Calendar,LogOut,ShoppingBag,Heart,
        ShoppingCart, MapPin,Settings, Lock, ChevronRight, Package,
        CreditCard,Edit3, Menu, X,Icon, } from 'lucide-react'

import { useState } from 'react'
import Sidebar from '../Profile/Sidebar'
import Overview from './Overview';
import MobileMenu from './MobileMenu'
import Logo from '../../Components/Logo';
import { Outlet } from 'react-router';


function Profile() {
  
 





  return (
               <div className='px-2'>
                     <div className='flex justify-between  items-center py-3 mx-2 border-b border-slate-300'>
                           <Logo/>
                           <div>
                                 <div className='flex items-center gap-3'>
                                    <div className='relative '>
                                     <ShoppingCart/>
                                    <p className='absolute -top-4 right-0'>5</p>
                                    </div>
                                    <div>
                                          <button className='hidden lg:block border-slate-950 py-2 px-4 border rounded-sm bg-black text-white'>
                                                   Go to Shooping
                                          </button>
                                    </div>
                                  </div>
                           </div>
                     </div>
                                                  {/* Sidebar and Man MENU */}
                     <div className='grid grid-cols-1 lg:grid-cols-4 mt-5'>
                           <div className='lg:hidden block'>
                                  <MobileMenu/>
                           </div>      
                                    {/*Mobile Menu */}
                           <aside className='hidden lg:block lg:col-span-1'>
                                 <Sidebar/>
                          </aside>
                           <section className='lg:col-span-3'>
                                 <Outlet/>
                           </section>
                     </div>                                                            
             </div>
  )
}

export default Profile
                                