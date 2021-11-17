import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import _ from "lodash";
import { getType } from "../../../core/services/Type";
import { getBrands } from "../../../core/services/brand";
import { getSize } from "../../../core/services/size";
import { getProductDetail, putProduct } from "../../../core/services/product";
import { FormikProps } from "formik";
import dayjs from "dayjs";
import { Router } from "next/router"

class ProductEditContext {
  types;
  brands;
  sizes;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.types = [];
    this.brands = [];
    this.sizes = [];
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  async preparation(id: string | string[], formik: FormikProps<any>) {
    try {
      const resp = await getProductDetail(id);
      formik.setFieldValue("product_name", resp.data.body.product_name);
      formik.setFieldValue("brand_id", resp.data.body.brand_id);
      formik.setFieldValue(
        "exp_date",
        dayjs(resp.data.body.exp_date).format("YYYY-MM-DD")
      );
      formik.setFieldValue("price", resp.data.body.price);
      formik.setFieldValue("description", resp.data.body.description);
      formik.setFieldValue("type_id", resp.data.body.type_id);
      formik.setFieldValue("size_id", resp.data.body.size_id);
      formik.setFieldValue("quantity", resp.data.body.quantity);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
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

  async editProduct(values, id: string | string[]) {
    try {
      await putProduct(
        {
          ...values,
          exp_date:
            dayjs(values.exp_date).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
        },
        id
      );
      Router.prototype.push(`/product/${id}`)
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
}
export const productEditContext = createContext(new ProductEditContext());
