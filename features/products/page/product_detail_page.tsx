import dayjs from "dayjs";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import MainLayout from "../../../core/components/main_layout";
import { productDetailContext } from "../context/product_detail_context";

export default function ProductDetailPage() {
  const context = useContext(productDetailContext);

  const router = useRouter();
  console.log(router.query.id)

  useEffect(() => {
    console.log(router.query.id)
    context.preparation(router.query.id);
  }, []);

  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="mt-[64px] flex space-x-[32px] px-[20px]">
            <div className="flex flex-col items-center w-2/5 space-y-[32px]">
              <div className="w-[336px] h-[336px] bg-[#DCDCDC] relative flex justify-center items-center rounded-[91px]">
                <div className="absolute w-[256px] h-[256px] bg-[#B0B0B0] rounded-full" />
                <img
                  className="absolute w-[256px] h-full pt-[48px] pb-[36px]"
                  src=""
                />
              </div>
              <div className="flex justify-around w-full">
                <div className="w-[96px] h-[96px] bg-[#DCDCDC] rounded-[30px]">
                  <img className="w-full p-[16px] h-full" src="" />
                </div>
                <div className="w-[96px] h-[96px] bg-[#DCDCDC] rounded-[30px]">
                  <img className="w-full p-[16px] h-full" src="" />
                </div>
                <div className="w-[96px] h-[96px] bg-[#DCDCDC] rounded-[30px]">
                  <img className="w-full p-[16px] h-full" src="" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between w-3/5">
              <div className="bg-[#E9F1F6] w-[512px] rounded-[10px] py-[32px] px-[32px] space-y-[8px]">
                <h1 className="subheading1 text-[#2C5675]">
                  {context.product?.product_name || ""}
                </h1>
                <div className="flex space-x-[4px]">
                  <p className="caption1 text-[#4D506C]">
                    <span className="font-extrabold">Detail:</span>
                  </p>
                  <p className="caption1 text-[#4D506C]">
                    {context.product?.description || ""}
                  </p>
                </div>
                <p className="caption1 text-[#4D506C]">
                  <span className="font-extrabold">type: </span>
                  {context.product?.types.type_name || ""}
                </p>
                <p className="caption1 text-[#4D506C]">
                  <span className="font-extrabold">Expire: </span>
                  {dayjs(context.product?.exp_date).format("DD/MM/YYYY") || ""}
                </p>
                <p className="caption1 text-[#4D506C]">
                  <span className="font-extrabold">Price: </span>
                  {context.product?.price || ""}฿
                </p>
                <p className="caption1 text-[#4D506C]">
                  <span className="font-extrabold">Size: </span>
                  {`${context.product?.sizes.sizes || ""} pills`}
                </p>
              </div>

              <div className="w-[512px] mb-[32px]">
                <div className="flex w-full space-x-[32px]">
                  <input
                    type="number"
                    className="font-black text-center border subheading2 focus:outline-none border-[#367CB0] w-[112px] py-[4px] px-[8px] rounded-[10px]"
                    onChange={(e) => {
                      if (Number(e.target.value) > 0) {
                        context.setValue("amount", e.target.value);
                      }
                    }}
                    value={context.amount}
                  />
                  <button className="bg-[#236EA6] flex-grow text-white subheading2 rounded-[4px]" onClick={() => {}}>
                    Add to Cart
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
