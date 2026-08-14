import { useContext } from 'react';
import { CartContext } from '../Context/Cartcontext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Button from '../Components/Button';

function Cartpage() {
  const {
    cartitem,
    deletfromCart,
    decQty,
    incQty,
    totalprice,
  } = useContext(CartContext);



  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8  md:py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className='text-2xl  border-b  mb-4'>Products Cart ({cartitem.length})</h1>
        <div>
          {cartitem.length === 0 ? (
            <div>
              <h1>No Itme In Cart</h1>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-10'>
              <div className='col-span-2'>
                <div>
                  {cartitem.map((item) => (
                    <div key={item.id} className='flex flex-col justify-between gap-3 p-1 sm:flex-row border-b-2 mb-2'>
                      <div className='flex items-center gap-5'>
                        <div>
                          <img src={item.images[0]} alt="" className='w-24 h-24' />
                        </div>
                        <div className='flex-1 flex-col'>
                          <h1>{item.category}</h1>
                          <h1>{item.name}</h1>
                          <h1>$ {item.price}</h1>
                        </div>
                      </div>
                      <div className='flex items-center justify-between gap-10 py-3 p-3'>
                        <div className='flex items-center gap-3 border border-gray-600 py-1 px-2'>
                          <button onClick={() => decQty(item.id)}><Minus size={15} /></button>
                          <p>{item.Quantity}</p>
                          <button onClick={() => incQty(item.id)}><Plus size={15} /></button>
                        </div>
                        <div>
                          <button onClick={() => deletfromCart(item.id)}><Trash2 /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order MEnu */}

              <div className='col-span-1 py-3'>
                <div className=' md:sticky   md:top-10 px-3 py-5 bg-black/40'>
                  <h1 className='text-center text-3xl font-semibold'>Cart Total </h1>
                  <div className='flex justify-between mt-3 px-2'>
                    <h1>Subtotal</h1>
                    <p>${Number(totalprice).toFixed(2)}</p>
                  </div>
                  <div className='flex justify-between pt-3 px-2'>
                    <h1>Total</h1>
                    <p>${Number(totalprice).toFixed(2)}</p>
                  </div>
                  <div className='flex justify-between pt-3 px-2'>
                    <h1>Shipping</h1>
                    <p>Free</p>
                  </div>
                  <div className='flex items-center justify-center border border-gray-600 mt-5 bg-black text-white py-2 font-semi-bold'>
                    <button>Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cartpage;