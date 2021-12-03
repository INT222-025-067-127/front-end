import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getType } from "../../../core/services/Type";
import { getBrands } from "../../../core/services/brand";
import { getSize } from "../../../core/services/size";
import { postProduct } from "../../../core/services/product";
import _ from "lodash";
import { Router } from "next/router";
import { uploadImage } from "../../../core/services/image";

class ProductCreateContext {
  types;
  brands;
  sizes;
  isCreating;

  constructor() {
    this.types = [];
    this.brands = [];
    this.sizes = [];
    this.isCreating = false;
    makeAutoObservable(this);
  }

  setValue(key: string, value: any) {
    this[key] = value;
  }

  async prepareTypes() {
    try {
      const resp = await getType();
      this.types = resp.data.body;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareBrand() {
    try {
      const resp = await getBrands();
      this.brands = resp.data.body;
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  async prepareSize() {
    try {
      const resp = await getSize();
      this.sizes = _.map(resp.data.body, (size) => ({
        ...size,
        selected: false,
        qty: "",
      }));
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  createProduct(value) {
    this.isCreating = true;
    try {
      _.map(this.sizes, async (size) => {
        if (size.selected && size.qty > 0) {
          const data = {
            ...value,
            brand_id: Number(value.brand_id),
            type_id: Number(value.type_id),
            quantity: Number(size.qty),
            size_id: size.size_id,
          };
          const resp = await postProduct(data);

          const formData = new FormData();
          formData.append("image", value.image);

          await uploadImage(resp.data.body.product_id, formData);
        }
      });
      this.isCreating = false;
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      if (!this.isCreating) {
        Router.prototype.push("/");
      }
      this.isCreating = false;
    }
  }
}
export const productCreateContext = createContext(new ProductCreateContext());
