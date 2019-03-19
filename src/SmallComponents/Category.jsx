import { useContext } from 'react';
import { FilterContext } from '../Context/FilteterContext';

// Category icon mapping (optional)
const categoryIcons = {
  electronics: '💻',
  clothing: '👕',
  books: '📚',
  furniture: '🪑',
  food: '🍕',
  // Add more as needed
};

function Category() {
  const { data, toggleCategory, Category } = useContext(FilterContext);
  
  const products = (data ?? []).reduce((acc, product) => {
   
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.entries(products).sort((a, b) => 
    a[0].localeCompare(b[0])
  );

  return (
    <div className="mt-3 px-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
          Category
        </h3>
        <span className="text-xs text-gray-400">
          {Object.keys(products).length} categories
        </span>
      </div>
      
      <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
        {sortedCategories.map(([category, count]) => {
          const isChecked = Category.includes(category);
          const icon = categoryIcons[category.toLowerCase()] ;
          
          return (
            <label
              key={category}
              className={`group flex cursor-pointer items-center justify-between rounded-lg px-3 py-1 transition-all duration-200 hover:bg-gray-50 ${
                isChecked ? 'bg-gray-50 ring-1 ring-gray-200' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => toggleCategory(category)}
                  checked={isChecked}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-black transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2"
                />
                <span className="text-base">{icon}</span>
                <span className={`text-sm font-medium capitalize ${
                  isChecked ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {category}
                </span>
              </div>
              
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                isChecked 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              }`}>
                {count}
              </span>
            </label>
          );
        })}
      </div>
      
      {Object.keys(products).length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-400">No categories available</p>
        </div>
      )}
    </div>
  );
}

export default Category;