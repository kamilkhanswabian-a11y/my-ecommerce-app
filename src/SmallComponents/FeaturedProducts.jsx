
import { useContext, useRef } from "react";
import { FilterContext } from "../Context/FilteterContext";
import Card from "../components/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function FeaturedProducts() {
  const { data, isPending } = useContext(FilterContext);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (isPending) {
    return (
      <section className="py-10">
        <p className="text-center">Loading featured products...</p>
      </section>
    );
  }

  const featured = (data || []).filter((item) => item.featured);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-bold ml-5">
            Featured Products
          </h1>

          {/* Allbirds-style arrows */}
          <div className="flex items-center mr-5">
            <button
              ref={prevRef}
              className="
                w-11 h-11
                border border-gray-300
                flex items-center justify-center
                hover:bg-black hover:text-white
                transition-all duration-200
              "
              aria-label="Previous products"
            >
              ←
            </button>

            <button
              ref={nextRef}
              className="
                w-11 h-11
                border-y border-r border-gray-300
                flex items-center justify-center
                hover:bg-black hover:text-white
                transition-all duration-200
              "
              aria-label="Next products"
            >
              →
            </button>
          </div>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured products found.
          </p>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="featured-swiper "
          >
            {featured.map((item) => (
              <SwiperSlide key={item.id}>
                <Card data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;

