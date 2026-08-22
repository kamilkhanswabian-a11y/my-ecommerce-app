import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-fade";

// Optional: add these in your <head> or _document for the editorial serif/sans pairing
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1747691875590-14db938e42d4?q=80&w=1600&auto=format&fit=crop",
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1600&auto=format&fit=crop",
    title: "New Fashion Arrivals",
    subtitle: "Premium Quality",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1779449604558-fb4ad80ce80b?q=80&w=1600&auto=format&fit=crop",
    title: "Street Style",
    subtitle: "Trending Collection",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1739132268693-8ba353f0959c?q=80&w=1600&auto=format&fit=crop",
    title: "Luxury Essentials",
    subtitle: "Designed For You",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1746206434527-b02438fc36af?q=80&w=1600&auto=format&fit=crop",
    title: "Exclusive Deals",
    subtitle: "Shop Today",
  },
];

export default function Slider() {
  const [swiperRef, setSwiperRef] = React.useState(null);
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1200}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        onSwiper={setSwiperRef}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="h-full w-full"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={banner.id}>
            {({ isActive }) => (
              <div className="relative h-full w-full text-white">
                {/* Background Image with Ken Burns */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={banner.image}
                    alt={banner.title}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1 }}
                    animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/85 md:via-black/45 md:to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-end md:items-center">
                  <div className="mx-auto w-full max-w-7xl px-6 pb-24 md:px-12 md:pb-0">
                    <div className="max-w-xl">
                      <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A24B]"
                      >
                        <span className="h-px w-8 bg-[#C9A24B]" />
                        {banner.subtitle}
                      </motion.p>

                      <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mb-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {banner.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="mb-9 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
                      >
                        Discover premium fashion designed for every season. Elevate
                        your style with our newest arrivals.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <button className="group relative overflow-hidden rounded-full border border-white/40 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#C9A24B]">
                          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                            Shop Now
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-[#C9A24B] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical look-number rail — signature element, desktop only */}
      <div className="pointer-events-none absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 md:flex md:flex-col md:items-end">
        <span className="font-serif text-2xl text-white/90" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {String(active + 1).padStart(2, "0")}
        </span>
        <span className="my-2 h-8 w-px bg-white/25" />
        <span className="text-xs text-white/40">{String(banners.length).padStart(2, "0")}</span>
      </div>

      {/* Custom arrows — hidden on mobile */}
      <div className="absolute bottom-8 right-6 z-20 hidden gap-3 md:right-12 md:flex">
        <button
          aria-label="Previous slide"
          onClick={() => swiperRef?.slidePrev()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[#C9A24B] hover:text-[#C9A24B]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label="Next slide"
          onClick={() => swiperRef?.slideNext()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[#C9A24B] hover:text-[#C9A24B]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Progress-line pagination — replaces dots, shown on all breakpoints */}
      <div className="absolute bottom-8 left-6 z-20 flex gap-2 md:left-12">
        {banners.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => swiperRef?.slideToLoop(i)}
            className="group relative h-[2px] w-8 overflow-hidden bg-white/25 md:w-10"
          >
            <span
              className="absolute inset-0 origin-left bg-[#C9A24B] transition-transform duration-500"
              style={{ transform: i === active ? "scaleX(1)" : "scaleX(0)" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}