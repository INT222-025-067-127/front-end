import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getHistory } from "../../../core/services/history";

class HistoryContext {
  histories: Array<{
    his_id: number;
    his_date: string;
    quantity: number;
    total: string;
    user_id: number;
    product_id: number;
    users: {
      user_id: number;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      role_id: number;
    };
    products: {
      product_id: number;
      product_name: string;
      exp_date: string;
      price: string;
      quantity: number;
      description: string;
      brand_id: number;
      type_id: number;
      size_id: number;
    };
  }>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.histories = [];
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  async preparartion(id: number) {
    try {
      const resp = await getHistory(id);

      this.histories = resp.data.body;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}
export const historyContext = createContext(new HistoryContext());
