import axios from "axios";

export const getProduct = () => {
  return axios.get(`${process.env.BE_API}/products/getproduct`);
};

export const getProductByType = (id: string) => {
  return axios.get(`${process.env.BE_API}/types/getTypeProduct/${id}`);
};

export const getProductDetail = (id: string | string[]) => {
  return axios.get(`${process.env.BE_API}/products/getProduct/${id}`);
};

export const postProduct = (data) => {
  return axios.post(`${process.env.BE_API}/products/addProduct`, data);
};

export const putProduct = (data, id: string | string[]) => {
  return axios.put(`${process.env.BE_API}/products/editProduct/${id}`, data);
};

export const deleteProduct = (id: string | string[]) => {
  return axios.delete(`${process.env.BE_API}/products/delete/${id}`);
};
