import { FilterContext } from "../Context/FilteterContext";
import { useContext } from "react";

function Sortbar() {
  const { Sortby, setSortby } = useContext(FilterContext);

  return (
    <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>
        <div className="relative">
          <select
            value={Sortby}
            onChange={(e) => setSortby(e.target.value)}
            className="appearance-none bg-transparent text-sm font-semibold text-gray-900 pr-8 py-1.5 pl-3 cursor-pointer hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg transition-colors duration-200"
          >
            <option value="New">Newest</option>
            <option value="Popular">Popular</option>
            <option value="low to high">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
            <option value="Top Rated">Top Rated</option>
          </select>
          {/* Custom dropdown arrow */}
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

     
    </div>
  );
}

export default Sortbar;