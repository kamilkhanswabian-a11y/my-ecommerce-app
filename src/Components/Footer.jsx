import {
  Heart
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
      title: "CUSTOMER SERVICE",
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

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT SIDE */}
          <div className="md:col-span-1">

            {/* LOGO */}
            <h2 className="text-2xl font-bold text-white">
              UrbanCart
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm leading-6 max-w-sm">
              Discover quality products, unbeatable prices,
              and a shopping experience designed for you.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              <a href="#" className="hover:text-white">
                <Heart size={20} />
              </a>

              <a href="#" className="hover:text-white">
                <Heart size={20} />
              </a>

              <a href="#" className="hover:text-white">
                <Heart size={20} />
              </a>

              <a href="#" className="hover:text-white">
                <Heart size={20} />
              </a>

            </div>

            {/* BACK TO TOP */}
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex items-center gap-2 mt-8 border border-slate-600 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
            >
              <Heart size={16} />
              Back to Top
            </button>

          </div>


          {/* RIGHT SIDE - YOUR EXISTING LINKS */}
          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-8">

            {footerLinks.map((section) => (

              <div key={section.title}>

                <h3 className="text-white font-semibold mb-4">
                  {section.title}
                </h3>

                <div className="flex flex-col gap-3">

                  {section.links.map((link) => (

                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-sm hover:text-white transition"
                    >
                      {link.name}
                    </Link>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="border-t border-slate-800 text-center py-4 text-sm">
        © 2026 UrbanCart. All Rights Reserved.
      </div>

    </footer>
  );
}