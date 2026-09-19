import { Minus, Plus } from 'lucide-react'
import React, { useContext } from 'react'
import { FilterContext } from '../Context/FilteterContext'

function Pagination() {
    const {page,setPage} = useContext(FilterContext)
    console.log(page,setPage);
    
  return (
    <div>
             <div className='flex justify-center items-center'>
                <div className='border border-gray-500 flex gap-4 '>
                  <button className='px-2' onClick={()=> setPage((prev)=> prev - 1)}>
                          <Minus size={14}
                        disabled={page === 1 ? true : false}
                          />
                  </button>
                  <p>
                       {page}
                  </p>
                  <button className='px-2'onClick={()=> setPage((prev)=> prev + 1)}
                //    disabled={page === 1 ? true : false}
                    >
                          <Plus size={14}/>
                  </button>
                </div>
             </div>
    </div>
  )
}

export default Pagination