import dayjs from "dayjs";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import MainLayout from "../../../core/components/main_layout";
import { AuthContext } from "../../../core/contexts/auth_context";
import { historyContext } from "../context/history_context";

export default function HistoryPage() {
  const context = useContext(historyContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    context.preparartion(authContext.user.user_id);
  }, []);

  return (
    <div>
      <Observer>
        {() => (
          <MainLayout>
            <div className="my-[16px]">
              <h1 className="heading2 text-[#00A0B0]">History</h1>

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

                {_.map(context.histories || [], (item, index) => (
                  <Fragment>
                    <div className="flex items-center space-x-[8px] tablet:col-span-4 col-span-full">
                      <img
                        src={`${process.env.BE_API}/images/getImg/${item.product_id}`}
                        alt=""
                        className="w-[36px] h-[36px] bg-[#B5B5B5]"
                      />
                      <div className="w-full">
                        <p className="caption2">{`${item.products.product_name}`}</p>
                        <div className="flex justify-between space-x-[8px] max-w-[200px]">
                          <p className="caption3">{`size: #30 pills`}</p>
                          <p className="caption3">
                            {dayjs(item.his_date).format("DD/MM/YYYY HH:mm")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-full col-span-2 col-start-1 tablet:col-span-1 tablet:col-start-auto">
                      <p className="subheading2">{`${item.quantity}`}</p>
                    </div>
                    <div className="flex items-center justify-center w-full h-full col-span-2 col-start-5 tablet:col-span-1 tablet:col-start-auto">
                      <p className="subheading2">{`${item.total} ฿`}</p>
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
