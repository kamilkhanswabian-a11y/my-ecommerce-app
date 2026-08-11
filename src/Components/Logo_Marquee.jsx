import React from 'react';
import { motion } from 'framer-motion';

// Sample Company / Tech Stack Logos
const LOGOS = [
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
  },
  {
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
  },
  {
    name: 'eBay',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg',
  },
  {
    name: 'Walmart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg',
  },
  {
    name: 'Target',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg',
  },
  {
    name: 'Nike',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  },
  {
    name: 'Adidas',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
  },
];

function LogoMarquee() {
  // Duplicate list to guarantee seamless infinite looping
  const marqueeLogos = [...LOGOS, ...LOGOS];

  return (
    <div className="w-full bg-white py-12 flex flex-col items-center overflow-hidden">
      
      {/* Optional Title */}
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
        Trusted by developers worldwide
      </p>

      {/* Marquee Wrapper with Gradient Mask Edges */}
      <div className="relative w-full max-w-6xl overflow-hidden ">
        
        {/* Animated Track */}
        <motion.div
          className="flex w-max items-center gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 30, // Adjust speed (higher = slower)
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-3 px-10 py-1 rounded-2xl bg-transparent  border border-slate-800/80 "
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default LogoMarquee;