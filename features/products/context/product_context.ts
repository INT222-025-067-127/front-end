import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getType } from "../../../core/services/Type";
import { getProduct, getProductByType } from "../../../core/services/product";
import _ from "lodash";

class ProductContext {
  search_word: string;
  type: string;
  typeOption: Array<{
    type_id: string;
    type_name: string;
  }>;

  products: Array<any>;

  isloading: boolean;

  constructor() {
    this.search_word = "";
    this.type = "";
    this.products = [];
    this.isloading = false;
    makeAutoObservable(this);
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }

  async prepare() {
    try {
      this.isloading = true;
      const resp = await getProduct();
      this.products = _.map(resp.data.body, (product) => ({
        ...product,
      }));
      this.isloading = false;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareType() {
    try {
      const resp = await getType();
      if (resp.status !== 204) {
        this.typeOption = resp.data.body;
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  filterProduct() {
    return _.filter(
      this.products,
      (product) =>
        product.product_name.toLowerCase().includes(this.search_word) &&
        (product.type_id === this.type || this.type === "")
    );
  }
}
export const productContext = createContext(new ProductContext());
