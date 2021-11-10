import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  onClick: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="flex flex-col items-center justify-between w-full px-24 py-8 bg-[#E9F1F6] rounded-[10px] h-full cursor-pointer" onClick={props.onClick}>
      <div className="flex flex-col items-center">
        <div className="w-160 h-160 rounded-full bg-[#B0B0B0]">
          {props.image && (
            <img
              src={props.image}
              className="relative object-contain w-full h-full top-16"
            />
          )}
        </div>
        <p className="text-[#2C5675] subheading2 mt-16 text-center">
          {props.name}
        </p>
      </div>
      <p className="text-[#008795] subheading2 mt-8">
        {props.price} <span className="caption1">฿</span>
      </p>
    </div>
  );
}
