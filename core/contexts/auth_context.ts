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

  getCookie(name) {
    let cookieArr = document.cookie.split(";");
    
    for (const i in cookieArr) {
      const cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return "a ";
  }

  setCookie(name: string, value: string, timeToLive?: number) {
    let cookie = name + "=" + encodeURIComponent(value);
    cookie += "; max-age=" + timeToLive;
    document.cookie = cookie;
  }

  async signin(authForm: { username: string; password: string }) {
    try {
      const resp = await postsignin(authForm);
      this.user = {
        role: resp.data.body.role.role_name,
      };

      if (resp.status === 200) {
        this.setCookie("pluem-token", resp.data.body.token, 1800);
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
      const resp = await fetchToken(this.getCookie("pluem-token"));
      if (resp.status !== 204) {
        this.user = {
          role: "buyer",
        };
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        console.log(err);
        alert(err.message);
      }
    }
  }
}

export const AuthContext = createContext(new AuthContextClass());
