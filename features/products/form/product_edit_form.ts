import * as Yup from "yup";

export const prouctEditInitValue = {
  product_name: "",
  brand_id: "",
  exp_date: "",
  price: 0,
  description: "",
  type_id: "",
  quantity: 0,
  size_id: "",
  image: null,
};

export const productEditSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  brand_id: Yup.number().required("Brand is required"),
  exp_date: Yup.string().required("Expiration date is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  type_id: Yup.number().required("Type is required"),
});
