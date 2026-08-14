import {
  AArrowUp,
  HeartIcon
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "SHOP",
      links: [
        { name: "All Products", path: "/products" },
        { name: "New Arrivals", path: "/products/new" },
        { name: "Best Sellers", path: "/products/best-sellers" },
        { name: "Sale", path: "/sale" },
      ],
    },

    {
      title: "SUPPORT",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Shipping", path: "/shipping" },
        { name: "Returns", path: "/returns" },
        { name: "FAQs", path: "/faq" },
      ],
    },

    {
      title: "ABOUT",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Our Story", path: "/our-story" },
        { name: "Blog", path: "/blog" },
        { name: "Reviews", path: "/reviews" },
      ],
    },

    {
      title: "ACCOUNT",
      links: [
        { name: "My Account", path: "/account" },
        { name: "My Orders", path: "/orders" },
        { name: "Wishlist", path: "/wishlist" },
        { name: "Cart", path: "/cart" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-slate-300">
                    <div className="max-w-7xl py-12 px-8">
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                         <div className="md:col-span-1">
                                                    <h1 className="font-bold text-2xl text-white">
                                                         Aura
                                                    </h1>
                                                    <p className="mt-4 text-sm leading-6 max-w-sm">
                                                      Discover quality products, unbeatable prices, and a shopping experience designed for you.
                                                    </p>

                                                    <div className="flex gap-4 mt-6">
                                                               <a href=""className="hover:text-white">
                                                                  <HeartIcon size={20}/>
                                                               </a>

                                                               <a href=""className="hover:text-white">
                                                                  <HeartIcon size={20}/>
                                                               </a>

                                                               <a href=""className="hover:text-white">
                                                                  <HeartIcon size={20}/>
                                                               </a>

                                                               <a href=""className="hover:text-white">
                                                                  <HeartIcon size={20}/>
                                                               </a>
                                                    </div>

                                                      <button
                                                         onClick={() =>
                                                           window.scrollTo({
                                                                            top: 0,
                                                                            behavior: "smooth",
                                                                           })
                                                                    }
                                                       className="flex items-center gap-2 mt-8 border border-slate-600 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
                                                                              >
                                                                                <AArrowUp size={16} />
                                                                                Back to Top
                                                                              </button>

                                         </div>

                                         <div className="md:col-span-2  grid lg:grid-cols-4 grid-cols-2 gap-8">
                                                 {
                                                   footerLinks.map((links)=> (
                                                         <div key={links.name} className="flex flex-col gap-3">
                                                                    <h1 className="font-semibold text-white ">
                                                                         {links.title}
                                                                    </h1>

                                                                    <Link className="flex flex-col gap-2 text-sm">
                                                                            {links.links.map((link)=>(
                                                                               <h1 key={link.name}>
                                                                                   {link.name}
                                                                               </h1>
                                                                            ))}
                                                                    </Link>
                                                         </div>
                                                   )) 
                                                 }       
                                         </div>
                                  </div>
                    </div>

                    <div className="border-t border-slate-800 text-center py-4 text-sm">
                            © 2026 UrbanCart. All Rights Reserved.
                    </div>
    </footer>
  );
}