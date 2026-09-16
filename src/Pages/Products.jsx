import { useContext, useState } from "react";
import { FilterContext } from "../Context/FilteterContext";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Sortbar from "../Components/Sortbar";
import Card from "../Components/Card";
import Spinner from "../SmallComponents/Spinner";
import Footer from '../Components/Footer'
import Filter_Bar from '../Components/Filter_Bar'
import { X } from "lucide-react";
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
        
    

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Desktop Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-1">
            <Sidebar />
          </aside>

          {/* Product Feed Area */}
          <section className="col-span-1 lg:col-span-3 space-y-6">
                   
          <div className="flex justify-between items-center ">
                <div className="flex lg:hidden" onClick={()=> setIsMobileFilterOpen(!isMobileFilterOpen)}>
                     <Filter_Bar />  
                </div>

                <div>
                     <Sortbar></Sortbar>
                </div>
          </div> 
          
          {isMobileFilterOpen && (
                     <div className="sticky z-50 lg:hidden ">
                           <div className="flex justify-end items-center m-3 p-2">
                              <button onClick={()=> setIsMobileFilterOpen(false)}>
                                           <X/>
                              </button>
                           </div>
                          <Sidebar/>
                     </div>
          )}



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