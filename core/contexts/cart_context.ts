import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { buyProduct } from "../services/cart";
import dayjs from "dayjs";
import { Router } from "next/router";

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
    this.cart = [];
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
      if (this.cart[index].quantity + quantity <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity += quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  async buyAll(user_id) {
    try {
      await Promise.all(
        _.map(this.cart, async (item: any) => {
          await buyProduct({
            his_date: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
            quantity: Number(item.quantity),
            total: item.product_price * item.quantity,
            user_id: user_id,
            product_id: item.product_id,
          });
        })
      );

      this.cart = [];
      localStorage.setItem("cart", JSON.stringify(this.cart));
      Router.prototype.push("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}
export const cartContext = createContext(new CartContext());
