import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../core/contexts/auth_context";
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  onClick: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  const router = useRouter();

  const authContext = useContext(AuthContext);

  return (
    <div
      className="flex flex-col items-center justify-between w-full px-24 py-8 bg-[#E9F1F6] rounded-[10px] h-full cursor-pointer relative"
      onClick={props.onClick}
    >
      {authContext.user.role === "admin" && (
        <div
          className="absolute p-[4px] right-[16px] top-[16px] hover:bg-gray-200 rounded-[4px] active:bg-gray-400"
          onClick={() => router.push(`/product/${props.id}/edit`)}
        >
          <i className="text-xl fas fa-edit" />
        </div>
      )}
      {authContext.user.role === "buyer" && (
        <div
          className="absolute p-[4px] right-[16px] top-[16px] hover:bg-gray-200 rounded-[4px] active:bg-gray-400"
          onClick={() => {}}
        >
          <i className="text-xl fas fa-cart-plus"></i>
        </div>
      )}
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
