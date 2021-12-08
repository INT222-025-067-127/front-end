import { useFormik } from "formik";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import MainLayout from "../../../core/components/main_layout";
import TextInput from "../../../core/components/text_input";
import { productCreateContext } from "../context/product_create_context";
import {
  productCreateSchema,
  prouctCreateInitValue,
} from "../form/product_create_form";
import dayjs from "dayjs";

export default function ProductCreatePage() {
  const context = useContext(productCreateContext);

  const formik = useFormik({
    initialValues: prouctCreateInitValue,
    validationSchema: productCreateSchema,
    onSubmit: (values) => {
      context.createProduct(values);
    },
  });

  const imageInput = useRef(null);

  useEffect(() => {
    context.prepareTypes();
    context.prepareBrand();
    context.prepareSize();
  }, []);

  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="mt-[64px] flex flex-col space-y-[8px] laptop:space-y-0 laptop:flex-row laptop:space-x-[32px] laptop:px-[20px]">
            <div className="flex flex-col items-center w-full laptop:w-2/5 space-y-[32px]">
              <div className="w-[320px] h-[320px] bg-[#DCDCDC] relative flex justify-center items-center rounded-[91px]">
                <div
                  className="absolute w-[256px] h-[256px] bg-[#B0B0B0] rounded-full cursor-pointer"
                  onClick={() => imageInput.current.click()}
                />
                {formik.values.image ? (
                  <img
                    className="absolute w-[256px] h-full pt-[48px] pb-[36px] cursor-pointer object-contain"
                    src={URL.createObjectURL(formik.values.image)}
                    onClick={() => imageInput.current.click()}
                  />
                ) : (
                  <i
                    className="z-20 text-[#DCDCDC] fas fa-images text-8xl cursor-pointer"
                    onClick={() => imageInput.current.click()}
                  />
                )}

                <input
                  className="hidden"
                  type="file"
                  ref={imageInput}
                  accept="image/*"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between w-full laptop:w-3/5">
              <div className="bg-[#E9F1F6] max-w-[512px] w-full rounded-[10px] py-[32px] px-[32px] space-y-[16px]">
                <h1 className="subheading1 text-[#2C5675] text-center">
                  Add Product
                </h1>
                <TextInput
                  onChange={(e) => {
                    formik.setFieldValue("product_name", e.target.value);
                  }}
                  title="Name"
                  value={formik.values.product_name}
                />

                <div className="flex space-x-[4px]">
                  <div className="caption1 text-[#4D506C] flex w-full space-x-[8px] items-center">
                    <span className="font-extrabold">Brand:</span>
                    <select
                      name=""
                      id=""
                      className="flex-grow rounded-[4px] py-[4px]"
                      onChange={(e) => {
                        formik.setFieldValue(
                          "brand_id",
                          Number(e.target.value)
                        );
                      }}
                      value={formik.values.brand_id}
                    >
                      <option value="" disabled>
                        brand
                      </option>
                      {_.map(context.brands || [], (brand) => (
                        <option value={brand.brand_id || ""}>
                          {brand.brand_name || ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-[4px]">
                  <div className="caption1 text-[#4D506C] flex w-full space-x-[8px] items-center">
                    <span className="font-extrabold">Type:</span>
                    <select
                      name=""
                      id=""
                      className="flex-grow rounded-[4px] py-[4px]"
                      onChange={(e) => {
                        formik.setFieldValue("type_id", Number(e.target.value));
                      }}
                      value={formik.values.type_id}
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      {_.map(context.types || [], (type) => (
                        <option value={type.type_id || ""}>
                          {type.type_name || ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-x-[4px] flex items-center">
                  <p className="caption1 text-[#4D506C]">
                    <span className="font-extrabold">Expire:</span>{" "}
                  </p>
                  <input
                    className="py-[4px] px-[4px]"
                    type="date"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "exp_date",
                        dayjs(e.target.value).format(
                          "YYYY-MM-DDTHH:mm:ss.SSS"
                        ) + "Z"
                      );
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 laptop:grid-cols-2 gap-[8px] w-full">
                  {_.map(context.sizes || [], (size) => (
                    <div className="flex space-x-[8px] items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          size.selected = e.target.checked;
                        }}
                      />
                      <div className="bg-[#008795] rounded-[4px] h-[32px] w-[64px] flex justify-center items-center">
                        <p className="text-white caption1">{size.sizes}</p>
                      </div>

                      <input
                        placeholder={size.selected ? "qty." : ""}
                        className="w-[36px] px-[4px] rounded-[4px] focus:outline-none"
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            size.qty = Number(e.target.value);
                          }
                        }}
                        value={size.selected ? size.qty : ""}
                        disabled={!size.selected}
                      />
                      <input
                        placeholder={size.selected ? "price" : ""}
                        className="w-[72px] px-[4px] rounded-[4px] focus:outline-none"
                        onChange={(e) => {
                          if (!isNaN(Number(e.target.value))) {
                            size.price = Number(e.target.value);
                          }
                        }}
                        value={size.selected ? size.price : ""}
                        disabled={!size.selected}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-x-[4px] flex">
                  <p className="caption1 text-[#4D506C]">
                    <span className="font-extrabold">Detail:</span>{" "}
                  </p>
                  <textarea
                    className="py-[4px] px-[4px] focus:outline-none w-full h-[96px] rounded-[4px]"
                    onChange={(e) => {
                      formik.setFieldValue("description", e.target.value);
                    }}
                    value={formik.values.description}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-red-500 caption3">
                    {_.map(formik.errors, (error, key) => (
                      <p>{error}</p>
                    ))}
                  </div>
                  <button
                    className="rounded-[4px] bg-[#236EA6] text-white subheading2 h-[48px] px-[16px]"
                    onClick={() => formik.submitForm()}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
}
