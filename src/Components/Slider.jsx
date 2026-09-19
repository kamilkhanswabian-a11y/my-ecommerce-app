import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Core Swiper styles — required no matter which modules you use
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Fonts (put this link in your <head> / _document instead if you prefer):
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500&display=swap" rel="stylesheet">

const banners = [
 
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    title: "Statement colorways designed to pop",
    cta: "Explore bold",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Retro Runner",
    title: "Vintage aesthetics meet modern comfort",
    cta: "Shop runners",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Urban Minimal",
    title: "Clean lines and versatile everyday profiles",
    cta: "Discover minimal",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "High-Top Drop",
    title: "Ankle-cut streetwear essentials",
    cta: "View high-tops",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1779449604558-fb4ad80ce80b?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "The sidewalk edit",
    title: "Street pieces that hold their shape",
    cta: "Browse street",
  },
];

export default function HeroSwiper() {
  return (
    <Swiper
      // modules: every plugin you want (fade, dots, arrows, autoplay)
      // has to be passed in here, or it silently does nothing
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      // one slide visible, full width, no gap
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false, // keep autoplaying even after a manual swipe
      }}
      pagination={{ clickable: true }}
      navigation={true}
      className="hero-swiper h-screen w-full"
    >
      {banners.map((b) => (
        <SwiperSlide key={b.id} className="">
          <div className=" h-screen w-full ">
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* readability scrim so white text holds on any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-24 md:px-16 md:pb-32">
              <span className="text-sm font-medium tracking-wide text-white/80">
                {b.eyebrow}
              </span>
              <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight text-white md:text-6xl">
                {b.title}
              </h1>
              <button className="mt-8 w-fit border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black">
                {b.cta}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #fff;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #fff;
        }
      `}</style>
    </Swiper>
  );
}