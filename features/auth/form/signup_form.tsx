import * as Yup from "yup";

export const signupFormInit = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  email: "",
};

export const signupFormValidate = Yup.object().shape({
  username: Yup.string().required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "password must be longer than 8")
    .max(15, "password must be short than 16")
    .matches(/^(?=.*[a-z])/, "password must contain one lowercase")
    .matches(/^(?=.*[A-Z])/, "password must contain one uppercase")
    .matches(/^(?=.*[0-9])/, "password must contain one number")
    .matches(
      /^(?=.*[!@#\$%\^&\*_])/,
      "password must contain one special case character"
    ),
  firstname: Yup.string().required("This field is required"),
  lastname: Yup.string().required("This field is required"),
  email: Yup.string()
    .required("This field is required")
    .email("Please insert a valid email"),
});
