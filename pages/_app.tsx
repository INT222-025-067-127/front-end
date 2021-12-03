import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import AuthLayout from "../core/components/auth_layout";
import { useContext, useEffect } from "react";
import { cartContext } from "../core/contexts/cart_context";
import PermissionLayout from "../core/components/permission_layout";

function MyApp({ Component, pageProps }: AppProps) {
  const CartContext = useContext(cartContext);

  useEffect(() => {
    CartContext.preparation();
  }, []);

  return (
    <AuthLayout>
      <PermissionLayout>
        <Component {...pageProps} />
      </PermissionLayout>
    </AuthLayout>
  );
}
export default MyApp;
