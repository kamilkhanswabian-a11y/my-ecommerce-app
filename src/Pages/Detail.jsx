import { useContext, useState } from "react";
import { useParams } from "react-router";
import { FilterContext } from "../Context/FilteterContext";
import Spinner from '../SmallComponents/Spinner';
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";

function Detail() {
  const { data, isPending, error } = useContext(FilterContext);
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (error) return (<p>{error}</p>);
  if (isPending) return (<Spinner />);
  
  const p = data?.find((item) => item.id == id);

  return (
    <>
      <Navbar />
          <div className="flex justify-center gap-4 mt-5">
                  <div className="flex gap-2">
               <div className="flex flex-col gap-3">
                   {p.images?.slice(0,4).map((url,index)=>(
                     <img src={url} key={index} 
                     className="w-20 h-20 rounded-md"
                     onClick={()=> setSelectedImageIndex(index)}
                     />
                   ))}
               </div>

               <div>
                   <img src={p?.images[selectedImageIndex]} alt="" className="w-96 h-96 rounded-md" />
               </div>
          </div>

          <div className="flex flex-col gap-3 w-1/2">
              <h1 className="text-4xl font-heading">{p.name}</h1>
              <div className="flex justify-between">
                <p>{p.brand}</p>
                <p className="bg-slate-500 w-24 text-center rounded-full">{p.category}</p>
              </div>
             
             <ul>
                Description : 
                <li className="font-serif">{p.description}</li>
             </ul>

              <div className="flex justify-between">
                   <p>Rs {p.price}</p>
                   <p>⭐ {p.rating}</p>
              </div>

              <div className="flex justify-center gap-1  bg-slate-100 border-2 p-3 rounded-full">
                   <button>Add to Cart</button>
                   <ShoppingCart size={23}></ShoppingCart>
              </div>
          </div>
          </div>
    </>
  );
}

export default Detail;