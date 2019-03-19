import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
    title: "New Fashion Arrivals",
    subtitle: "Premium Quality",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52?auto=format&fit=crop&w=1920&q=80",
    title: "Street Style",
    subtitle: "Trending Collection",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80",
    title: "Luxury Essentials",
    subtitle: "Designed For You",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1920&q=80",
    title: "Exclusive Deals",
    subtitle: "Shop Today",
  },
];

export default function Slider() {
  return (
    <section className="w-full ">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        speed={900}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        className="h-[85vh]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative  h-[100vh] w-full">
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center ml-10">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
                  <div className="max-w-xl text-white">
                    <p className="mb-3 text-lg uppercase tracking-[6px] text-gray-300">
                      {banner.subtitle}
                    </p>

                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                      {banner.title}
                    </h1>

                    <p className="mb-8 text-lg text-gray-200">
                      Discover premium fashion designed for every season.
                      Elevate your style with our newest arrivals.
                    </p>

                    <div className="md:text-left  gap-4">
                      <button className="rounded-md bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200">
                        Shop Now
                      </button>
                    </div>
                  </div>

                  {/* Right Side Empty (keeps content left aligned) */}
                  <div className="hidden lg:block w-1/2"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}