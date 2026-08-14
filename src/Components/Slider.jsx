import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1747691875590-14db938e42d4?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "New Fashion Arrivals",
    subtitle: "Premium Quality",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1779449604558-fb4ad80ce80b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Street Style",
    subtitle: "Trending Collection",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1739132268693-8ba353f0959c?q=80&w=848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Luxury Essentials",
    subtitle: "Designed For You",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1746206434527-b02438fc36af?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Exclusive Deals",
    subtitle: "Shop Today",
  },
];

export default function Slider() {
  return (
    <section className="w-full overflow-hidden  pt-5  h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        className="h-[85vh] w-full "
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full p-5 text-white">
                {/* Background Image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                {/* Content Container */}
                <div className="relative z-10 flex h-full items-center">
                  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12">
                    
                    {/* Animated Text Content */}
                    <div className="max-w-2xl text-white ml-5">
                      
                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-3 text-sm md:text-base font-semibold uppercase tracking-[6px] text-emerald-400"
                      >
                        {banner.subtitle}
                      </motion.p>

                      {/* Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-6 text-4xl font-extrabold leading-tight md:text-7xl tracking-tight"
                      >
                        {banner.title}
                      </motion.h1>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-8 text-base md:text-lg text-slate-300 max-w-lg leading-relaxed"
                      >
                        Discover premium fashion designed for every season. Elevate
                        your style with our newest arrivals.
                      </motion.p>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <button className="rounded-xl bg-white px-8 py-4 font-semibold text-slate-950 transition-all duration-300 hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-xl">
                          Shop Now
                        </button>
                      </motion.div>

                    </div>

                    {/* Right spacer */}
                    <div className="hidden lg:block w-1/3"></div>

                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}