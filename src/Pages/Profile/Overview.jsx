import { User,ShoppingBag, MapPin,ShoppingCart,Heart,Edit3,Mail, Calendar, BadgeCheck, ChevronRight} from 'lucide-react'
import { useContext } from 'react';
import { CartContext } from '../../Context/Cartcontext';
import { Wishlistcontext } from '../../Context/Whislistcontext'
import { Link } from 'react-router';

function Overview() {
  const {totalQuantity} = useContext(CartContext);
  const {totalItem}= useContext(Wishlistcontext)
  const Cart = [
    {
       icon : ShoppingBag,
       name: "Order",
       total : "Total Products",
       count : 0, 
    },
     {
       icon : Heart,
       name: "Whishlist",
       total : "Saved Products",
       count :  totalItem,
    },
     {
       icon : ShoppingCart,
       name: "Cart",
       total : "Item In Cart",
       count : totalQuantity  
    },
     {
       icon : MapPin,
       name: "Addresses",
       total : "Saved Adresses",
       count : 0, 
    }
]
  return (
    <div className='border border-black/20 rounded-xl px-2 mx-1'>
              <div className='flex items-center px-5 mx-3 my-8 py-4 rounded-2xl justify-between bg-black text-white'>
                     <div>
                            <p>Welcome Back</p>
                            <h1>User</h1>
                            <p>Manage your Account and Order</p>
                     </div>
                     <div>
                           <ShoppingBag/>
                     </div>
              </div>
                                                 {/* Gird 0ne Grid four in Lg */}
              <div className='grid grid-cols-1 lg:grid-cols-4'>
                    {Cart.map((item)=> {
                      const Icon = item.icon;
                    return (
                            <div className='flex justify-between rounded-xl px-4 mx-4 my-6 mt-8 py-4 border border-slate-200 hover:border-slate-400 ' key={item.name}>
                          <div>
                                <Icon/>
                               <div className='mt-2'>
                                    <h1>{item.name}</h1>
                                    <p>{item.total}</p>
                               </div>
                          </div>
                          <div>
                               {item.count}
                          </div>
                    </div>
                    ) 
                    })}
              </div>
              <div className='rounded-lg border border-slate-200 py-4 px-4 mx-4'>
                     <div className='flex justify-between items-center mt-4'>
                           <div>
                           <h1 className='font-semibold text-3xl'>Personal Information</h1>
                           <p>Your account deatails</p>
                           </div>
                     <div className='flex gap-2'>
                        <Edit3/>
                        <p>Edit</p>
                      </div>
                     </div>
                                                  {/*Info Cards*/}
                    <div className='my-6 grid grid-cols-1 lg:grid-cols-2'>
                            <div className='flex items-center gap-2 mt-8'> 
                                  <div className='bg-slate-200 px-3 py-3 rounded-full'>
                                      <User/>
                                  </div>
                                  <div>
                                     <p>Full Name</p>
                                     <p>Kamil Khan</p>
                                  </div>
                            </div>
                            <div className='flex items-center gap-2 mt-8'> 
                                  <div className='bg-slate-200 px-3 py-3 rounded-full'>
                                      <Mail/>
                                  </div>
                                  <div>
                                     <p>Full Name</p>
                                     <p>Kamil Khan</p>
                                  </div>
                            </div>
                            <div className='flex items-center gap-2 mt-8'> 
                                  <div className='bg-slate-200 px-3 py-3 rounded-full'>
                                      <Calendar/>
                                  </div>
                                  <div>
                                     <p>Full Name</p>
                                     <p>Kamil Khan</p>
                                  </div>
                            </div>
                            <div className='flex items-center gap-2 mt-8'> 
                                  <div className='bg-slate-200 px-3 py-3 rounded-full'>
                                       <BadgeCheck />
                                  </div>
                                  <div>
                                     <p>Full Name</p>
                                     <p>Kamil Khan</p>
                                  </div>
                            </div>
                    </div>
              </div>
                                                 {/*Info Cards End*/}
              <div className='my-5 mx-4 py-5 px-4 mt-4 border border-slate-200 rounded-md'>
                    <div>
                          <h1 className='font-semibold text-3xl'>Quick Action</h1>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3'>
                    <div className='flex justify-between mt-5 px-3 py-3 border border-slate-200 rounded-lg hover:border-slate-300'>
                           <div className='flex flex-col  gap-1'>
                               <ShoppingBag/>
                               <h1>Continue Shppoing</h1>
                               <p>{totalItem} saved item</p>  
                           </div>
                           <div>
                               <Link to=''>
                                        <ChevronRight/>
                               </Link>
                           </div>
                    </div>
                    <div className='flex justify-between mt-5 px-3 py-3 border border-slate-200 rounded-lg hover:border-slate-300'>
                           <div className='flex flex-col  gap-1'>
                               <Heart/>
                               <h1>Veiw Wishlist</h1>
                               <p>{totalItem} saved item</p>  
                           </div>
                           <div>
                              <Link to='/whislist'>
                                        <ChevronRight/>
                               </Link>
                           </div>
                    </div>
                    <div className='flex justify-between mt-5 px-3 py-3 border border-slate-200 rounded-lg hover:border-slate-300'>
                           <div className='flex flex-col  gap-1'>
                               <ShoppingCart/>
                               <h1>Veiw Cart</h1>
                               <p>{totalQuantity} saved item</p>  
                           </div>
                           <div>
                               <Link to='/cart'>
                                        <ChevronRight/>
                               </Link>
                           </div>
                    </div>
                    </div>
              </div>             
    </div>
  )
}

export default Overview