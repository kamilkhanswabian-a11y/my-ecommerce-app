import axios from "axios";

const Api = axios.create({
  baseURL: "https://6a76d2b463e9caf860c31ffd.mockapi.io/products",
});

export const getProducts = async (page,limit) => {
  const res = await Api.get("/",{
      params : {
        page,
        limit,
      }
  });
  return res.data; // ✅ return just the array/payload
};

export default Api;