import _ from "lodash";
import { Observer } from "mobx-react-lite";
import React from "react";
import MainLayout from "../../../core/components/main_layout";

export default function MemberPage() {
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex laptop:justify-between items-center my-[48px] flex-col laptop:flex-row mx-auto space-y-[32px] laptop:space-y-0">
            {_.map(
              [
                {
                  name: "เค้ก",
                  code: "62130500025",
                  position: "DevOps",
                  image: "/images/cake.jpg",
                },
                {
                  name: "ปลื้ม",
                  code: "62130500067",
                  position: "Back-end, Database",
                  image: "/images/pluem.jpg",
                },
                {
                  name: "พิซซ่า",
                  code: "62130500127",
                  position: "Front-end",
                  image: "/images/pizza.jpg",
                },
              ],
              (member) => (
                <div className="w-[288px] px-[8px] py-[12px] bg-[#008795] flex flex-col items-center">
                  <img
                    src={member.image}
                    className="w-[248px] h-[248px] rounded-full border-8 border-white object-contain"
                    alt={`รูป ${member.name}`}
                  />
                  <p className="mt-[16px] text-white subheading2">
                    {member.name}
                  </p>
                  <p className="text-[#FDF9DC] subheading2">{member.code}</p>
                  <p className="mt-[24px] text-white caption2">
                    {member.position}
                  </p>
                </div>
              )
            )}
          </div>
        </MainLayout>
      )}
    </Observer>
  );
}
