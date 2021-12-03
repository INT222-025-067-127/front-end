import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import MainLayout from "../../../core/components/main_layout";
import { AuthContext } from "../../../core/contexts/auth_context";
import { cartContext } from "../../../core/contexts/cart_context";

export default function CartPage() {
  const context = useContext(cartContext);
  const authContext = useContext(AuthContext);

  return (
    <div>
      <Observer>
        {() => (
          <MainLayout>
            <div className="mt-[16px]">
              <h1 className="heading2 text-[#00A0B0]">MY CART</h1>

              <div className="bg-[#E9F1F6] w-full rounded-[8px] grid grid-cols-6 px-[16px] py-[8px] gap-y-[16px]">
                <div className="hidden col-span-4 tablet:block">
                  <p className="text-[#236EA6] subheading1">Name</p>
                </div>
                <div className="items-center justify-center hidden col-span-1 tablet:flex">
                  <p className="text-[#236EA6] subheading1">Amount</p>
                </div>
                <div className="items-center justify-center hidden col-span-1 tablet:flex">
                  <p className="text-[#236EA6] subheading1">Price</p>
                </div>

                {_.map(context.cart, (item, index) => (
                  <Fragment>
                    <div className="flex items-center space-x-[8px] tablet:col-span-4 col-span-full">
                      <img
                        src={`${process.env.BE_API}/images/getImg/${item.product_id}`}
                        alt=""
                        className="w-[36px] h-[36px] bg-[#B5B5B5]"
                      />
                      <div>
                        <p className="caption2">{`${item.product_name}`}</p>
                        <p className="caption3">{`size: ${item.size}pills`}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full h-full col-span-2 col-start-1 tablet:col-span-1 tablet:col-start-auto">
                      <button
                        className="subheading2"
                        onClick={() => context.addProduct(item, -1)}
                      >
                        -
                      </button>
                      <p className="subheading2">{`${item.quantity}`}</p>
                      <button
                        className="subheading2"
                        onClick={() => context.addProduct(item, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center justify-center w-full h-full col-span-2 col-start-5 tablet:col-span-1 tablet:col-start-auto">
                      <p className="subheading2">{`${
                        item.quantity * item.product_price
                      } ฿`}</p>
                    </div>
                  </Fragment>
                ))}
                <div className="grid grid-cols-6 border-t border-gray-200 col-span-full">
                  <div className="flex justify-end col-start-5">
                    <p className="text-[#83817F] subheading1">Total:</p>
                  </div>
                  <div className="flex justify-center col-start-6">
                    <p className="text-[#008795] subheading1">
                      {_.sum(
                        _.map(
                          context.cart,
                          (item) => item.quantity * item.product_price
                        )
                      )}{" "}
                      ฿
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex tablet:justify-end w-full justify-center mt-[16px]">
                <button
                  className="bg-[#008795] px-[24px] text-white subheading1 py-[4px] rounded-full mr-0 tablet:mr-[48px]"
                  onClick={() => context.buyAll(authContext.user.user_id)}
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </MainLayout>
        )}
      </Observer>
    </div>
  );
}
