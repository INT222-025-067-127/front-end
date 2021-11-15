import ProductDetailPage from "../../../features/products/page/product_detail_page";

const ProductDetailRoute = () => {
  return <ProductDetailPage />;
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

export default ProductDetailRoute;
