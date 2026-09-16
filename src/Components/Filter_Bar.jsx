import { FilterIcon } from "lucide-react";

function Filter_Bar() {
  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-md py-2 px-4 hover:border-gray-700">Filters <FilterIcon size={20}/></div>
  )
}

export default Filter_Bar