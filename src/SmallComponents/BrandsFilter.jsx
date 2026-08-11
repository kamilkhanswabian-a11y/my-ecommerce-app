import { useContext } from 'react';
import { FilterContext } from '../Context/FilteterContext';

function BrandsFilter() {
  const { data, toggleBrands, Brands } = useContext(FilterContext);
  const brands = [...new Set(data.map((item) => item.brand))];

  return (
    <div className="mt-6 px-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
        Brands
      </h3>
      
      <div className="sticky top-0 overflow-y-auto  border-r border-gray-100 bg-white">
        {brands?.map((brand) => (
          <label
            key={brand}
            className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {brand}
            </span>
            
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={Brands.includes(brand)}
                onChange={() => toggleBrands(brand)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 "
              />
            </div>
          </label>
        ))}
      </div>
      
      {brands?.length === 0 && (
        <p className="text-sm text-gray-500">No brands available</p>
      )}
    </div>
  );
}

export default BrandsFilter;