import React, { useContext, } from 'react';
import { FilterContext } from '../Context/FilteterContext';

function Stock() {
  const { inStock, toggleInStock } = useContext(FilterContext);

  return (
    <div className="mt-5 max-w-sm px-4 py-8">
      <label 
        onClick={toggleInStock}
        className={`
          flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer
          transition-all duration-200 select-none
          ${inStock 
            ? 'bg-emerald-50/50 border-emerald-500 shadow-sm shadow-emerald-100' 
            : 'bg-white border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            {inStock && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${inStock ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
          </span>
          
          <span className={`font-semibold ${inStock ? 'text-emerald-950' : 'text-slate-600'}`}>
            Available in Stock
          </span>
        </div>

        <div className="relative flex items-center ">
          <input
            type="checkbox"
            checked={inStock}
            onChange={toggleInStock}
            className="peer sr-only"
          />
          <div className="w-6 h-6 rounded-lg border-2 border-slate-300 bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
            <svg 
              className={`w-4 h-4 text-white transition-transform duration-150 ${inStock ? 'scale-100' : 'scale-0'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}

export default Stock;