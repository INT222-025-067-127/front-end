import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../core/contexts/auth_context";
import { cartContext } from "../../../core/contexts/cart_context";
interface ProductCardProps {
  image?: string;
  product: any;
  onClick: () => void;
}

export default function ProductCard(props: ProductCardProps) {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const CartContext = useContext(cartContext);

  return (
    <div className="flex flex-col items-center justify-between w-full px-24 py-8 bg-[#E9F1F6] rounded-[10px] h-full cursor-pointer relative">
      {authContext.user.role.role_name === "admin" && (
        <div
          className="absolute p-[4px] right-[16px] top-[16px] hover:bg-gray-200 rounded-[4px] active:bg-gray-400"
          onClick={() =>
            router.push(`/product/${props.product.product_id}/edit`)
          }
        >
          <i className="text-xl fas fa-edit" />
        </div>
      )}
      {authContext.user.role.role_name === "buyer" && (
        <div
          className="absolute p-[4px] right-[16px] top-[16px] hover:bg-gray-200 rounded-[4px] active:bg-gray-400"
          onClick={() => {
            CartContext.addProduct(props.product, 1);
          }}
        >
          <i className="text-xl fas fa-cart-plus"></i>
        </div>
      )}
      <div className="flex flex-col items-center" onClick={props.onClick}>
        <div className="w-160 h-160 rounded-full bg-[#B0B0B0]">
          {props.image && (
            <img
              src={props.image}
              className="relative object-contain w-full h-full top-16"
            />
          )}
        </div>
        <p className="text-[#2C5675] subheading2 mt-16 text-center">
          {props.product.product_name} {props.product.sizes.sizes} pills
        </p>
      </div>
      <p className="text-[#008795] subheading2 mt-8">
        {props.product.price} <span className="caption1">฿</span>
      </p>
    </div>
  );
}
