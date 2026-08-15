import { useContext } from "react";
import { FilterContext } from "../Context/FilteterContext";

function Sortbar() {
  const { Sortby, setSortby } = useContext(FilterContext);

  return (
    <div className="flex items-center justify-end py-4">
      <select
        value={Sortby}
        onChange={(e) => setSortby(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="New">Newest</option>
        <option value="Popular">Popular</option>
        <option value="low to high">
          Price: Low to High
        </option>
        <option value="High to Low">
          Price: High to Low
        </option>
        <option value="Top Rated">
          Top Rated
        </option>
      </select>
    </div>
  );
}

export default Sortbar;