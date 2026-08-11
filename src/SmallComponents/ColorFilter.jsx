import { useContext } from 'react';
import { FilterContext } from '../Context/FilteterContext';

function ColorFilter() {
  const { data, toggleColor, Color } = useContext(FilterContext);
  const colors = [...new Set(data.flatMap((item) => item.colors))];

  // Helper to check if color is light
  const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200;
  };

  return (
    <div className="mt-6 px-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
          Colors
        </h3>
        <span className="text-xs text-gray-400">
          {colors.length} colors
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = Color.includes(color);
          const isLight = isLightColor(color);
          
          return (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                isSelected 
                  ? 'border-black  ring-black ring-offset-2' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color }}
            >
              {isSelected && (
                <svg
                  className={`h-5 w-5 ${isLight ? 'text-black' : 'text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      
      {Color.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-3">
          <span className="text-xs font-medium text-gray-600">Selected:</span>
          {Color.map((color) => (
            <span
              key={color}
              className="inline-flex h-6 w-6 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
          <button
            onClick={() => Color.forEach(c => toggleColor(c))}
            className="ml-auto text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            Clear all
          </button>
        </div>
      )}
      
      {colors.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-400">No colors available</p>
        </div>
      )}
    </div>
  );
}

export default ColorFilter;