import axios from "axios";

export const getType = () => {
  return axios.get(`${process.env.BE_API}/types/getType`);
};
