import   { useContext } from 'react'
import Reviews from './Reviews'
import { FilterContext } from '../Context/FilteterContext'
const data = [
    {
        name: 'Wear All Day Comfort',
        title : 'Lightweight, bouncy, and wildly comfortable, Allbirds shoes make any outing feel effortless. Slip in, lace up, or slide them on and enjoy the comfy support.'
    },
    {
        name: 'DESIGNED FOR EVERYDAY WEAR',
        title : 'Easy-to-wear styles made for daily routines, weekend plans, travel, and everything in between.'
    },
    {
        name: 'Materials From The Earth',
        title : 'We replace petroleum-based synthetics with natural alternatives wherever we can. Like using wool, tree fiber, and sugarcane. They’re soft, breathable, and better for the planet—win, win, win.'
    },
]
function Review() {
   
    return (
        <div className=''>
            <Reviews className='grid lg:grid-cols-3 my-6 md:grid-cols-2 rounded-lg '>
                {data?.map((review) => (
                    <div key={review.name} className='bg-slate-100  flex flex-col justify-start rounded-lg mx-4 mt-4 px-3 py-4 space-y-3'>
                        <h3 className='font-medium'>{review.name}</h3>
                        <p>{review.title}</p>
                    </div>
                ))}
            </Reviews>
        </div>
    )
}

export default Review