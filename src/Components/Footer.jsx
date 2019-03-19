import { ArrowUp } from "lucide-react";

export default function Footer() {
  // Quick helper to scroll smoothly back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* 1. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Responsive Grid Structure: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-sm bg-white text-black">
                A
              </div>
              <span>AURA</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crafting premium and modern digital experiences. Minimalist designs tailored for functionality and style.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-black rounded-full text-slate-400 hover:text-white transition-all duration-200">
                
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-black rounded-full text-slate-400 hover:text-white transition-all duration-200">
               
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-black rounded-full text-slate-400 hover:text-white transition-all duration-200">
               
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-black rounded-full text-slate-400 hover:text-white transition-all duration-200">
                
              </a>
            </div>
          </div>

          {/* Column 2: Shop / Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Shop</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Discounts</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Support</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          {/* Column 4: Legal / Privacy */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Company</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 2. Bottom Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} AURA Inc. All rights reserved.
          </div>
          
          {/* Scroll back to top button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-all duration-200 group"
          >
            Back to top
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}