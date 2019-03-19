import BrandsFilter from "../SmallComponents/BrandsFilter";
import Category from "../SmallComponents/Category";
import ColorFilter from "../SmallComponents/ColorFilter";
import PriceFilter from "../SmallComponents/PriceFilter";
import RatingFilter from "../SmallComponents/RatingFilter";
import Stock from "../SmallComponents/Stock";

function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto  border-r border-gray-100 bg-white
      /* Custom Scrollbar Styling for Webkit Browsers (Chrome, Safari, Edge) */
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-gray-200
      [&::-webkit-scrollbar-thumb]:rounded-full
      hover:[&::-webkit-scrollbar-thumb]:bg-gray-300
      /* Firefox Scrollbar Styling */
      [scrollbar-width:thin]
      [scrollbar-color:theme(colors.gray.200)_transparent]
    ">
      <Category />
      <BrandsFilter />
      <ColorFilter />
      <RatingFilter />
      <PriceFilter />
      <Stock />
    </aside>
  );
}

export default Sidebar;