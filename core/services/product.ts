import axios from "axios";

export const getProduct = () => {
  return axios.get(`${process.env.BE_API}/products/getproduct`);
};

export const getProductByType = (id: string) => {
  return axios.get(`${process.env.BE_API}/types/getTypeProduct/${id}`);
};
