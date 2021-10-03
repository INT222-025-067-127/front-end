import axios from "axios";

export const postsignin = (body: { username: string; password: string }) => {
  return axios.post(`${process.env.API}/users/login`, body);
};

export const postsignup = (body: {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}) => {
  return axios.post(`${process.env.API}/users/register`, body);
};

export const fetchToken = (token: string) => {
  return axios.get(`${process.env.API}/auth/check`, {
    headers: {
      "pluem-token": token,
    },
  });
};
