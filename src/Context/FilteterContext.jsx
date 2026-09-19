import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import { getProducts } from "../apii/Api";
import { useSearchParams } from 'react-router-dom';
import PriceFilter from "../SmallComponents/PriceFilter";

export const FilterContext = createContext(null);

export default function FilterProvider({ children }) {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1)
   //                                  get data from api
   const limit = 9;

  const { data, isPending, error } = useQuery({
    queryKey: ["Products",page],
    queryFn:()=>  getProducts(page,limit),
    keepPreviousData: true
  });




  //                 Store Filters  in Url that can persist after refresh
  const [Sortby, setSortby] = useState(() => {
    return searchParams.get("sort") || "New";
  });

  const [Category, setCategory] = useState(() => {
    return searchParams.get('category')?.split(',') || [];
  });

  const [Brands, setBrands] = useState(() => {
    return searchParams.get('brands')?.split(',') || [];
  });

  const [Color, setColor] = useState(() => {
    return searchParams.get('color')?.split(',') || [];
  });

  const [Rating, setRating] = useState(() => {
    return Number(searchParams.get('rating')) || 0;
  });

  const [inStock, setinStock] = useState(() => {
    return searchParams.get('inStock') === 'true';
  });

  const [priceRange, setpriceRange] = useState(() => {
    return {
      min: Number(searchParams.get('minPrice')) || 0,
      max: Number(searchParams.get('maxPrice')) || 1000,
    };
  });


  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (Category.length > 0) {
      params.set('category', Category.join(','));
    }
    
    if (Brands.length > 0) {
      params.set('brands', Brands.join(','));
    }
    
    if (Color.length > 0) {
      params.set('color', Color.join(','));
    }
    
    if (Rating > 0) {
      params.set('rating', Rating.toString());
    }
    
    if (inStock) {
      params.set('inStock', 'true');
    }
    
    if (priceRange.min > 0) {
      params.set('minPrice', priceRange.min.toString());
    }
    
    if (priceRange.max < 1000) {
      params.set('maxPrice', priceRange.max.toString());
    }

    if (Sortby !== "New") {
      params.set("sort", Sortby);
    }
    
    setSearchParams(params);
  }, [Category, Brands, Color, Rating, inStock, priceRange,Sortby, setSearchParams]);




  // Category Filter 
  const toggleCategory = (cat) => {
    setCategory((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat)
        : [...prev, cat]
    );
  };

  // Brands Filter
  const toggleBrands = (brand) => {
    setBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  // Colors Filter  
  const toggleColor = (color) => {
    setColor((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  // Stock Filter  
  function toggleInStock() {
    setinStock((prev) => !prev);
  }


  //                                             Filter products from Api 
  const filterProducts = data?.filter((item) => {
    const matchCategory = Category.length === 0 ||
      Category.includes(item.category);
    
    const matchBrands = Brands.length === 0 ||
      Brands.includes(item.brand);
    
    const matchColor = Color.length === 0 ||
      item.colors?.some((item) => Color.includes(item));
    
    const matchrate = Rating === 0 || item.rating >= Rating;
    
    const priceMatch = Number(item.price) >= priceRange.min && 
      Number(item.price) <= priceRange.max;

    const stockMatch = !inStock || Boolean(item.inStock);
    
    return matchCategory && matchBrands && matchColor && 
      matchrate && priceMatch && stockMatch;
  });


  //                                     Sort products from Api but use spread operater 
  //                                      that make sure it won't change orignal array 
 
  const sortedProducts = [...(filterProducts || [])].sort(
    (a, b) => {
      if (Sortby === "low to high") {
        return Number(a.price) - Number(b.price);
      }

      if (Sortby === "High to Low") {
        return Number(b.price) - Number(a.price);
      }

      if (Sortby === "Top Rated") {
        return Number(b.rating) - Number(a.rating);
      }

      if (Sortby === "Popular") {
        return Number(b.rating) - Number(a.rating);
      }

      // Newest / default
      return 0;
    }
  );




  return (
    <FilterContext.Provider value={{
      filterProducts: sortedProducts,
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
      // Sort products
      Sortby,
      setSortby,
      //
      page, 
      setPage

    }}>
      {children}
    </FilterContext.Provider>
  );
}
