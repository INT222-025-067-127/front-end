import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getProductDetail } from "../../../core/services/product";

export class ProductDetailContext {
  product: {
    product_id: string;
    product_name: string;
    exp_date: string;
    price: number;
    quantity: number;
    description: string;
    brand_id: string;
    type_id: string;
    size_id: string;
    brands: {
      brand_id: string;
      brand_name: string;
    };
    types: {
      type_id: string;
      type_name: string;
    };
    sizes: {
      size_id: string;
      sizes: string;
    };
  };

  amount: number;

  constructor() {
    this.amount = 1;
    makeAutoObservable(this);
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }

  async preparation(id: string | string[]) {
    try {
      const resp = await getProductDetail(id);
      this.product = resp.data.body;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}

export const productDetailContext = createContext(new ProductDetailContext());
