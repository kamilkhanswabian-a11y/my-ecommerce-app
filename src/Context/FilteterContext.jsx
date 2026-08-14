import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import { getProducts } from "../apii/Api";
import { useSearchParams } from 'react-router-dom';

export const FilterContext = createContext(null);

export default function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL parameters
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
    
    setSearchParams(params);
  }, [Category, Brands, Color, Rating, inStock, priceRange, setSearchParams]);

  const { data, isPending, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts
  });

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

  return (
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