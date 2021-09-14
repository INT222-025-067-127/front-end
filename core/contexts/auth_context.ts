import { makeAutoObservable } from "mobx";
import { createContext } from "react";

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

  setUserToBuyer() {
    this.user.role = "buyer";
  }

  setUserToAnonymous() {
    this.user.role = "anonymous";
  }
}

export const AuthContext = createContext(new AuthContextClass());
