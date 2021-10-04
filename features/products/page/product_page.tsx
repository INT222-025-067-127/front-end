import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import MainLayout from "../../../core/components/main_layout";
import ProductCard from "../component/product_card";
import SelectDropdown from "../component/select_dropdown";
import TextInput from "../component/text_input";
import { productContext } from "../context/product_context";

export default function ProductPage() {
  const context = useContext(productContext);

  useEffect(() => {
    context.prepare();
    context.prepareType();
  }, []);

  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="pt-16 pb-32 tablet:pt-72">
            <div className="flex flex-col tablet:items-end tablet:justify-between tablet:flex-row tablet:leading-10">
              <h1 className="text-[#00A0B0] heading1">Product</h1>
              <div className="flex flex-row-reverse tablet:flex-row">
                <div className="w-1/3 tablet:w-112">
                  <SelectDropdown
                    options={[
                      { type_id: "", type_name: "All" },
                      ...(context.typeOption || []),
                    ]}
                    onChange={(e) => {
                      context.setValue("type", e);
                      //   context.prepare();
                    }}
                    value={context.type}
                  />
                </div>
                <div className="flex items-end w-2/3 mr-16 tablet:ml-16 tablet:w-320">
                  <TextInput
                    placeholder="search"
                    onChange={(e) => {
                      context.setValue("search_word", e.target.value);
                      //   context.filterProduct();
                    }}
                  />
                </div>
              </div>
            </div>

            {context.isloading ? (
              <div className="mx-auto mt-48 w-max">
                <i className="fas fa-spinner animate-spin text-[#2C5675] text-6xl" />
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 mt-32 tablet:grid-cols-2 tablet-xl:grid-cols-3 gap-y-16 tablet:gap-y-32">
                {_.map(context.filterProduct() || [], (product) => (
                  <div className="flex justify-center w-full">
                    <div className="w-2/3 tablet:w-5/6">
                      <ProductCard
                        id={product.product_id}
                        name={product.product_name}
                        price={product.price}
                        image="/images/mock.png"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </MainLayout>
      )}
    </Observer>
  );
}
