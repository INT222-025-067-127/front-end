import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { postsignin } from "../services/Auth";

class AuthContextClass {
  user: {
    role: "anonymous" | "buyer" | "seller";
    token: string;
  };

  constructor() {
    this.user = {
      role: "anonymous",
      token: "",
    };
    makeAutoObservable(this);
  }

  setValue(key: string, value) {
    this[key] = value;
  }

  async signin(authForm: { username: string; password: string }) {
    try {
      await postsignin(authForm);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const AuthContext = createContext(new AuthContextClass());
