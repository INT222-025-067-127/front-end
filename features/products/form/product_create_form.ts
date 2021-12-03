import * as Yup from "yup";

export const prouctCreateInitValue = {
  product_name: "",
  exp_date: "",
  price: 0,
  quantity: 0,
  description: "",
  brand_id: "",
  type_id: "",
  size_id: "",
  image: null,
};

export const productCreateSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  brand_id: Yup.number().required("Brand is required"),
  exp_date: Yup.string().required("Expiration date is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  type_id: Yup.number().required("Type is required"),
  image: Yup.mixed().required("Image is required"),
  // size_id: Yup.string().required("Size is required"),
});
