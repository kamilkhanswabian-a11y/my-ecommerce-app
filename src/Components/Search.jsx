import { SearchIcon } from 'lucide-react'; // Make sure lucide-react is installed

function Search() {
  return (
    // <div className="relative w-full max-w-[320px]">
    //   {/* 1. The Search Icon overlay */}
    //   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
    //     <SearchIcon size={18} />
    //   </div>

    //   {/* 2. The upgraded Input field */}
    //   <input 
    //     type="text" 
    //     placeholder="Search for products..." 
    //     className="
    //       w-full 
    //       h-10
    //       pl-10 
    //       pr-4 
    //       text-sm 
    //       bg-white 
    //       text-gray-800 
    //       placeholder-gray-400
    //       border border-gray-200 
    //       rounded-full 
    //       shadow-sm
          
    //       /* SMOOTH INTERACTION ENGINE */
    //       outline-none 
    //       transition-all 
    //       duration-200 
    //       ease-in-out
          
    //       /* HOVER & FOCUS STATES */
    //       hover:border-gray-300
    //       focus:border-black 
    //       focus:ring-4 
    //       focus:ring-black/5 
    //       focus:shadow-md
    //     " 
    //   />
    // </div>
         <SearchIcon size={25} 
         />
  )
}

export default Search;