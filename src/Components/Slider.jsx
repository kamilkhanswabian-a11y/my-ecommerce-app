import React, { useContext, useState } from "react";
import { FilterContext } from "../Context/FilteterContext";
import Spinner from "../SmallComponents/Spinner";

function Slider() {
  const { data, isPending } = useContext(FilterContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isPending) {
    return <Spinner />;
  }

  const images = data[0]?.images || [];

  const  nextSlide = () => {
    setCurrentIndex((prev)=> prev === images.length - 1 ? 0 : prev + 1 )
  }


  const  prevSlide = () => {
    setCurrentIndex((prev)=> prev ===  0 ? images.length - 1 : prev - 1 )
  }

  return (
    <div className="relative w-full h-screen  overflow-hidden rounded-xl pb-16">
      
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="Product"
        className="object-cover w-full h-screen pb-8"
      />

      {/* Buttons - Bottom Right */}
      <div className="absolute bottom-28 right-10 flex gap-2 ">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/90 
                     hover:bg-white shadow flex items-center 
                     justify-center text-xl "
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/90 
                     hover:bg-white shadow flex items-center 
                     justify-center text-xl"
        >
          →
        </button>
      </div>
     <img  alt="" />
    </div>
  );
}

export default Slider;