import axios from "axios";

export const uploadImage = (id, formData) => {
  return axios.post(`${process.env.BE_API}/images/addImg/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateImage = (id, formData) => {
  return axios.put(`${process.env.BE_API}/images/editImg/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
