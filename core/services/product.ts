import axios from "axios";

export const getProduct = () => {
  return axios.get(`${process.env.API}/products/getproduct`);
};

export const getProductByType = (id: string) => {
  return axios.get(`${process.env.API}/types/getTypeProduct/${id}`);
};

export const getProductDetail = (id: string | string[]) => {
  return axios.get(`${process.env.BE_API}/products/getProduct/${id}`);
};
