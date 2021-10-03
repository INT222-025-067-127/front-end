import { makeAutoObservable } from "mobx";
import { Router } from "next/dist/client/router";
import { getCookieParser } from "next/dist/server/api-utils";
import { createContext } from "react";
import { fetchToken, postsignin, postsignup } from "../services/Auth";

class AuthContextClass {
  user: {
    role: "anonymous" | "buyer" | "seller";
  };
  isUserAlreadyExists: boolean;

  signupFormik;
  signinFormik;

  constructor() {
    this.user = {
      role: "anonymous",
    };
    this.isUserAlreadyExists = false;
    makeAutoObservable(this);
  }

  setValue(key: string, value) {
    this[key] = value;
  }

  async signin(authForm: { username: string; password: string }) {
    try {
      const resp = await postsignin(authForm);
      this.user = {
        role: resp.data.body.role.role_name,
      };

      if (resp.status === 200) {
        document.cookie = `${process.env.TOKEN_COOKIE_NAME}=${resp.data.body.token}`;
        Router.prototype.push("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        this.signinFormik.setFieldError(
          "password",
          "username or password invalid"
        );
      } else {
        console.log(err);
        alert(err.message);
      }
    }
  }

  async signup(authForm) {
    try {
      const resp = await postsignup(authForm);
      if (resp.status === 201) {
        Router.prototype.push("/signin");
      }
    } catch (err) {
      if (err.response.status === 403) {
        this.signupFormik.setFieldError("username", "User is already exists");
      } else {
        console.log(err);
        alert(err.message);
      }
    }
  }

  async fetchMe() {
    try {
      const resp = await fetchToken(document.cookie.split("=")[1]);
      if (resp.status !== 204) {
        this.user = {
          role: "buyer",
        };
      }
    } catch (err) {
      if (err.response.status !== 401) {
        console.log(err);
        alert(err.message);
      }
    }
  }
}

export const AuthContext = createContext(new AuthContextClass());
