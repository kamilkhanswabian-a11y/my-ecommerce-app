import { useContext } from "react";
import { FilterContext } from "../Context/FilteterContext";

function RatingFilter() {
  const { Rating, setRating } = useContext(FilterContext);

  const ratings = [
    { label: "⭐⭐⭐⭐⭐", value: 5 },
    { label: "⭐⭐⭐⭐ & up", value: 4 },
    { label: "⭐⭐⭐ & up", value: 3 },
    { label: "⭐⭐ & up", value: 2 },
    { label: "⭐ & up", value: 1 },
  ];

  return (
    <div className="mt-6 px-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
        Rating
      </h3>
      
      <div className="space-y-2">
        {ratings.map((r) => {
          const isChecked = Rating === r.value;
          
          return (
            <label
              key={r.value}
              className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-gray-50 ${
                isChecked ? 'bg-gray-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setRating(isChecked ? 0 : r.value)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-black transition-colors focus:ring-2 focus:ring-black focus:ring-offset-2"
              />
              <span className={`text-sm font-medium ${
                isChecked ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {r.label}
              </span>
            </label>
          );
        })}
      </div>
      
      {Rating > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <span className="text-sm text-gray-600">Selected:</span>
          <span className="text-sm font-medium text-gray-900">
            {ratings.find(r => r.value === Rating)?.label}
          </span>
          <button
            onClick={() => setRating(0)}
            className="ml-auto rounded-full p-1 text-xs text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
          >
            ✕ Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default RatingFilter;