import { useContext, useState } from "react";
import { FilterContext } from "../Context/FilteterContext";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Sortbar from "../Components/Sortbar";
import Card from "../Components/Card";
import Spinner from "../SmallComponents/Spinner";
import Footer from '../Components/Footer'
function Products() {
  const { filterProducts, isPending } = useContext(FilterContext);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Mobile Filter Toggle Button (Hidden on Desktop) */}
        <div className="lg:hidden mb-4 flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {/* Filter Icon */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isMobileFilterOpen ? "Close Filters" : "Filter Products"}
          </button>
          
          <span className="text-sm text-gray-500">
            {filterProducts?.length || 0} items
          </span>
        </div>

        {/* Mobile Filter Dropdown/Collapsible Box */}
        {isMobileFilterOpen && (
          <div className="lg:hidden mb-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-lg transition-all">
            <Sidebar />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Desktop Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-1">
            <Sidebar />
          </aside>

          {/* Product Feed Area */}
          <section className="col-span-1 lg:col-span-3 space-y-6">
            <Sortbar />

            {!filterProducts || filterProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg font-medium">
                  No products found matching your filters.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filterProducts.map((item) => (
                  <li key={item.id}>
                    <Card data={item} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Products;