import { Star, Heart, HeartIcon } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Wishlistcontext } from '../Context/Whislistcontext';
import { useNavigate } from "react-router-dom";
import Cards from './Cards';
import Button from './Button';
function Card({ data }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(Wishlistcontext);
  const navigate = useNavigate();
  return (
          <li>
               {data.length === 0 && (
                   <h1 className='flex justify-center items-center text-black '>No product Founds...</h1>
               )}
               
               <Cards className='flex flex-col gap-3 bg-gray-200 border border-gray-100 rounded-md relative'>
                             
                            <div className='flex absolute right-2 top-2 text-white'>
                          <HeartIcon onClick={()=> addToWishlist(data)}
                              className={`w-6 h-6 cursor-pointer ${isInWishlist(data.id) ? ' fill-red-600' : 'bg-transparent text-white'}`}
                                />
                            </div>
    
                          <img src={data.images[0]} alt="" className='h-40 object-cover overflow-hidden p-1'/>
                          <p className='font-serif text-black ml-2'>{data.name}</p>
    
                          <div  className='flex justify-between px-1'>
                                  <p className='font-serif  p-1 text-black  text-sm  rounded-sm'>{data.brand}</p>
                                  <p className='font-serif  text-black bg-white/50 text-sm p-1 rounded-full'>{data.category}</p>
                          </div>

                          <div className='flex justify-between px-2'>
                                   <p>
                                        $ {data.price} 
                                   </p>
                                   <p className='font-serif text-yellow-100 bg-orange-300 text-sm rounded-full px-1 '>
                                          {data.rating}
                                   </p>
                          </div>
                          <Button className='bg-black/50 text-white p-2 rounded-lg mb-1 mx-5'
                           onClick={()=> addToCart(data)}
                          >Add To Cart</Button>
               </Cards>
               
          </li>
  );
}

export default Card;