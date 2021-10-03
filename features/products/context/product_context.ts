import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class ProductContext {
  search_word;

  constructor() {
    this.search_word = "";
    makeAutoObservable(this);
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const productContext = createContext(new ProductContext());
