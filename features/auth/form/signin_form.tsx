import * as Yup from "yup";

export const signinFormInit = {
  username: "",
  password: "",
};

export const siginFormValidate = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});
