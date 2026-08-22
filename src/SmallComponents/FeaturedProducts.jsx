import { useContext, useRef, useState } from "react";
import { FilterContext } from "../Context/FilteterContext";
import Card from "../Components/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] w-full bg-black/5" />
      <div className="mt-4 h-3 w-1/3 bg-black/5" />
      <div className="mt-2 h-4 w-2/3 bg-black/5" />
      <div className="mt-2 h-4 w-1/4 bg-black/5" />
    </div>
  );
}

function FeaturedProducts() {
  const { data, isPending } = useContext(FilterContext);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const featured = (data || []).filter((item) => item.featured);

  return (
    <section className="bg-[#FAF9F5] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#C9A24B]">
              <span className="h-px w-8 bg-[#C9A24B]" />
              Curated
            </p>
            <h1
              className="text-3xl font-medium tracking-tight text-[#141414] md:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Featured Products
            </h1>
          </div>

          {!isPending && featured.length > 0 && (
            <div className="hidden items-center gap-3 md:flex">
              <button
                ref={prevRef}
                disabled={atStart}
                aria-label="Previous products"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/15 text-[#141414]/70 transition-all duration-300 hover:border-[#C9A24B] hover:text-[#C9A24B] disabled:opacity-30 disabled:hover:border-[#141414]/15 disabled:hover:text-[#141414]/70"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                ref={nextRef}
                disabled={atEnd}
                aria-label="Next products"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/15 text-[#141414]/70 transition-all duration-300 hover:border-[#C9A24B] hover:text-[#C9A24B] disabled:opacity-30 disabled:hover:border-[#141414]/15 disabled:hover:text-[#141414]/70"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isPending ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="border border-dashed border-[#141414]/15 py-20 text-center">
            <p className="text-sm text-[#141414]/50">No featured products found.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSlideChange={(swiper) => {
              setAtStart(swiper.isBeginning);
              setAtEnd(swiper.isEnd);
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="featured-swiper"
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