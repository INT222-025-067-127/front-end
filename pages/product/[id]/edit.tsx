import React from "react";
import ProductEditPage from "../../../features/products/page/product_edit_page";

const ProductEditRoute = () => {
  return <ProductEditPage />;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default ProductEditRoute;
