import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import MainLayout from "../../../core/components/main_layout";
import { cartContext } from "../../../core/contexts/cart_context";

export default function CartPage() {
  const context = useContext(cartContext);
  return (
    <div>
      <Observer>
        {() => (
          <MainLayout>
            <div className="mt-[16px]">
              <h1 className="heading2 text-[#00A0B0]">MY CART</h1>

              <div className="bg-[#E9F1F6] w-full rounded-[8px] grid grid-cols-6 px-[16px] py-[8px] gap-y-[16px]">
                <div className="col-span-4">
                  <p className="text-[#236EA6] subheading1">Name</p>
                </div>
                <div className="flex items-center justify-center col-span-1">
                  <p className="text-[#236EA6] subheading1">Amount</p>
                </div>
                <div className="flex items-center justify-center col-span-1">
                  <p className="text-[#236EA6] subheading1">Price</p>
                </div>

                {_.map(context.cart, (item, index) => (
                  <Fragment>
                    <div className="flex items-center space-x-[8px] col-span-4">
                      <img
                        src=""
                        alt=""
                        className="w-[36px] h-[36px] bg-[#B5B5B5]"
                      />
                      <div>
                        <p className="caption2">{`${item.product_name}`}</p>
                        <p className="caption3">{`size: ${item.size}pills`}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-full col-span-1">
                      <p className="subheading2">{`${item.quantity}`}</p>
                    </div>
                    <div className="flex items-center justify-center w-full h-full col-span-1">
                      <p className="subheading2">{`${
                        item.quantity * item.product_price
                      }`}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </MainLayout>
        )}
      </Observer>
    </div>
  );
}
