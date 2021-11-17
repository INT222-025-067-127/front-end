import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { buyProduct } from "../services/cart";
import dayjs from "dayjs";

class CartContext {
  cart;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  preparation() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    if (!this.cart) {
      localStorage.setItem("cart", JSON.stringify([]));
      this.cart = [];
    }
  }

  addProduct(product, quantity) {
    /* check if prpduct exists in localstorage */

    const index = _.findIndex(
      this.cart,
      (item: any) => item.product_id === product.product_id
    );

    if (index === -1) {
      this.cart.push({
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.price,
        quantity: quantity,
        size: product.sizes.sizes,
      });
    } else {
      this.cart[index].quantity += quantity;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  async buyAll(user_id) {
    /* buy all products in cart */
    _.forEach(this.cart, async (item: any) => {
      await buyProduct({
        his_date: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
        quantity: item.quantity,
        total: item.price * item.quantity,
        user_id: user_id,
        product_id: item.product_id,
      });
    });
  }
}
export const cartContext = createContext(new CartContext());
