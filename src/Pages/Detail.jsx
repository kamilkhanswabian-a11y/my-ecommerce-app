import { useContext, useState } from "react";
import { useParams } from "react-router";
import { FilterContext } from "../Context/FilteterContext";
import Spinner from '../SmallComponents/Spinner';
import Navbar from "../Components/Navbar";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Footer from '../Components/Footer'
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

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

    {/* ================= IMAGE GALLERY ================= */}
    <div className="flex flex-col-reverse sm:flex-row gap-4">

      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">

        {p.images?.slice(0, 4).map((url, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
              selectedImageIndex === index
                ? "border-black"
                : "border-transparent"
            }`}
          >
            <img
              src={url}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}
      <div className="">

        <div className="flex aspect-square bg-slate-50 rounded-xl overflow-hidden ">

          <img
            src={p?.images?.[selectedImageIndex]}
            alt={p?.name}
            className=""
          />

        </div>

      </div>

    </div>


    {/* ================= PRODUCT DETAILS ================= */}
    <div className="flex flex-col gap-5">

      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold">
        {p.name}
      </h1>

      {/* Brand + Category */}
      <div className="flex items-center justify-between gap-4">

        <p className="text-lg font-medium">
          {p.brand}
        </p>

        <p className="bg-slate-500 text-white px-4 py-1 rounded-full text-sm">
          {p.category}
        </p>

      </div>

      {/* Description */}
      <div className="border-t border-b py-5">

        <p className="font-semibold mb-2">
          Description
        </p>

        <p className="font-serif text-gray-600 leading-7">
          {p.description}
        </p>

      </div>

      {/* Price + Rating */}
      <div className="flex items-center justify-between">

        <p className="text-2xl font-semibold">
          Rs {p.price}
        </p>

        <p className="text-lg">
          ⭐ {p.rating}
        </p>

      </div>

      {/* Add To Cart */}
      <div className="flex items-center justify-center gap-2 bg-slate-100 border-2 p-4 rounded-full cursor-pointer">

        <button className="font-semibold">
          Add to Cart
        </button>

        <ShoppingCart size={23} />

      </div>

    </div>

  </div>

</div>
       <Footer></Footer>
    </>
  );
}

export default Detail;