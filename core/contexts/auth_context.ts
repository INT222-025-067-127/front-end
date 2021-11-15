import { makeAutoObservable } from "mobx";
import { Router } from "next/dist/client/router";
import { getCookieParser } from "next/dist/server/api-utils";
import { createContext } from "react";
import { fetchToken, postsignin, postsignup } from "../services/Auth";

class AuthContextClass {
  user: {
    role: "anonymous" | "buyer" | "admin";
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

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  async signin(authForm: { username: string; password: string }) {
    try {
      const resp = await postsignin(authForm);
      this.user = {
        role: resp.data.body.role.role_name,
      };

      if (resp.status === 200) {
        this.setCookie(process.env.TOKEN_COOKIE_NAME, resp.data.body.token, 1);
        Router.prototype.push("/");
      }
    } catch (err) {
      if (err.response?.status === 401) {
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
      const resp: any = await fetchToken(
        this.getCookie(process.env.TOKEN_COOKIE_NAME)
      );
      if (resp.status !== 204) {
        this.user = {
          role: resp.data.user.role.role_name,
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
