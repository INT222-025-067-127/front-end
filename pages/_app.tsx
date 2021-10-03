import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import AuthLayout from "../core/components/auth_layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <Component {...pageProps} />
    </AuthLayout>
  );
}
export default MyApp;
