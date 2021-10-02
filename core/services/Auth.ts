import axios from "axios";

export const postsignin = (body: { username: string; password: string }) => {
  axios.post(`${process.env.API}/users/login`, body);
};

export const postsignup = (body: {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}) => {
  axios.post(`${process.env.API}/users/register`, body);
};
