import Marquee from "react-fast-marquee";

const logos = [
  "https://cdn.simpleicons.org/nike",
  "https://cdn.simpleicons.org/adidas",
  "https://cdn.simpleicons.org/apple",
  "https://cdn.simpleicons.org/puma",
  "https://cdn.simpleicons.org/zara",
  "https://cdn.simpleicons.org/hm",
];

export default function LogoMarquee() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold">
          Trusted by the world's leading brands
        </h2>
      </div>

      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-14 flex items-center justify-center"
          >
            <img
              src={logo}
              alt="Brand Logo"
              className="h-12 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}