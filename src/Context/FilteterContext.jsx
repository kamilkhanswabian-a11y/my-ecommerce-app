import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { getProducts } from "../apii/Api"
// 1. Create the Context
export const FilterContext = createContext(null);

export default function FilterProvider({ children }) {
  const [Category, setCategory] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Color, setColor] = useState([]);
  const [Rating, setRating] = useState(0)
  const [inStock, setinStock] = useState(false)
  const [priceRange, setpriceRange] = useState({
    min : 0,
    max:1000,
  })
  
  const { data, isPending, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts
  })

  
  
                                                // Category Filter 
  
  const toggleCategory = (cat) => {
    setCategory((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat)
        : [...prev, cat]
    );

  }
                                                // Brands Filter
                                                
   const toggleBrands = (brand) =>{
          setBrands((prev) =>
          prev.includes(brand) ?
          prev.filter((item)=> item !== brand)
          : [...prev,brand]
          )
   }                                             

                                                 // Colors Filter  

    const toggleColor = (color) =>{
             setColor((prev)=> 
             prev.includes(color) ? 
             prev.filter((item)=> item !== color) 
             : [...prev,color]
            )
    }

                                                 // Stock Filter  

   function toggleInStock() {
    setinStock((prev)=> !prev)
   }     






        const filterProducts = data?.filter((item) => {
          const matchCategory = Category.length === 0 ||
               Category.includes(item.category)
            
          const matchBrands = Brands.length === 0 ||
               Brands.includes(item.brand) 
          
          const matchColor = Color.length === 0 ||
           item.colors?.some((item)=>  Color.includes(item))    
          
          const matchrate = Rating === 0 || item.rating >= Rating;
             console.log(Rating);
          
          const priceMatch = Number(item.price) >= priceRange.min && Number(item.price) <= priceRange.max;

          const stockMatch = !inStock || Boolean(item.inStock)
              
            return matchCategory && matchBrands && matchColor && matchrate && priceMatch && stockMatch
                                                            
                                                   
                                                        })
                       console.log(filterProducts);
  return (
    // 2. Provide the Value
    <FilterContext.Provider value={{
      filterProducts,
      data,
      isPending,
      error,
      Category,
      toggleCategory,
      Brands,
      toggleBrands,
      Color,
      toggleColor,
      setRating,
      Rating,
      priceRange,
      setpriceRange,
      inStock,
      setinStock,
      toggleInStock,


    }}>
      {children}
    </FilterContext.Provider>
  );
}