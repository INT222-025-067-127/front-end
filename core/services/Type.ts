import axios from "axios";

export const getType = () => {
  return axios.get(`${process.env.API}/types/getType`);
};
