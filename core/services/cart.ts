import axios from "axios";

export const buyProduct = (data: {
  his_date: string;
  quantity: number;
  total: number;
  user_id: string;
  product_id: string;
}) => {
  return axios.post(`${process.env.API}/history/addHistory`, data);
};
