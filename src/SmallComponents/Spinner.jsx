import React from "react";

const ModernSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative">
        {/* Outer glow ring - subtle white glow */}
        <div className="absolute inset-[-10px] rounded-full bg-white/10 blur-2xl animate-pulse" />
        
        {/* Main spinner container */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-full p-5 border border-white/10">
          
          {/* Spinning ring - white with gradient transparency */}
          <div className="w-16 h-16 rounded-full border-[3px] border-white/20 border-t-white border-r-white/60 animate-spin relative">
            
            {/* Inner dot - pulsing white */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-lg shadow-white/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSpinner;