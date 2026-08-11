import React, { useContext } from 'react'
import Reviews from './Reviews'
import { FilterContext } from '../Context/FilteterContext'

function Review() {
    const { data } = useContext(FilterContext)
    console.log(data);

    return (
        <div className=''>
            <h1 className='text-center font-serif text-4xl mt-3'>
                Customers Reviews
            </h1>
            <Reviews className='grid lg:grid-cols-3 my-20 sm:grid-cols-2 rounded-lg '>
                {data && data.length > 0 && data[0]?.reviews?.map((review, index) => (
                    <div key={index} className='border rounded-md mx-4 mt-4 px-3 py-4 space-y-3 border-black'>
                        <h3 className='font-medium'>{review.reviewer}</h3>
                        <p>{review.rating} ⭐⭐⭐⭐⭐</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </Reviews>
        </div>
    )
}

export default Review