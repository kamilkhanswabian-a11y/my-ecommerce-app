import axios from "axios";

const Api = axios.create({
  baseURL: "https://6a38ca3964a2d8269222ce44.mockapi.io/products",
});

export const getProducts = async () => {
  const res = await Api.get("/");
  return res.data; // ✅ return just the array/payload
};

export default Api;