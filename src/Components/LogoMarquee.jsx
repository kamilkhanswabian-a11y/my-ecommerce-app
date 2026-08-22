import Marquee from "react-fast-marquee";

const logos = [
  { name: "Nike", src: "https://cdn.simpleicons.org/nike" },
  { name: "Adidas", src: "https://cdn.simpleicons.org/adidas" },
  { name: "Apple", src: "https://cdn.simpleicons.org/apple" },
  { name: "Puma", src: "https://cdn.simpleicons.org/puma" },
  { name: "Zara", src: "https://cdn.simpleicons.org/zara" },
  { name: "H&M", src: "https://cdn.simpleicons.org/hm" },
];

export default function LogoMarquee() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className=" mb-14 max-w-7xl  text-center">
        <h2
          className="text-3xl font-medium tracking-tight text-[#141414] md:text-4xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Trusted by the world&apos;s leading brands
        </h2>
      </div>

      {/* Framing hairlines + edge fade */}
      <div className="">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center">
              <div className="group flex items-center justify-center ">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-7  opacity-35 grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <span className="h-6  bg-[#141414]/10" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}