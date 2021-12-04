import axios from "axios";

export const getHistory = (id: number) => {
  return axios.get(`${process.env.BE_API}/historys/getHistory/${id}`);
};
