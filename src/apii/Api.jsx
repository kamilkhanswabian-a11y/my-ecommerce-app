import { supabase } from "../supabaseClient";

export const getProducts = async (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .range(from, to);
    
  if (error) {
    throw error;
  }

  return data;
};