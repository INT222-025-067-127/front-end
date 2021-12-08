import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import classnames from "classnames";
import _ from "lodash";
import { AuthContext } from "../contexts/auth_context";
import { mainLayoutContext } from "../contexts/main_layout_context";
import { Observer } from "mobx-react-lite";
import { cartContext } from "../contexts/cart_context";

const route = [
  { name: "Product", path: "/" },
  { name: "Cart", path: "/cart" },
  { name: "Members", path: "/members" },
];

export default function MainLayout({ children, fullWidth = false }) {
  const router = useRouter();

  const context = useContext(mainLayoutContext);
  const authContext = useContext(AuthContext);
  const CartContext = useContext(cartContext);

  return (
    <Observer>
      {() => (
        <div>
          <div className="mx-0 laptop:mx-112 bg-[#c4c4c4] tablet:h-[72px] desktop:h-[96px] rounded-none laptop:rounded-b-[24px] desktop:rounded-b-[48px] flex justify-between items-center h-48 px-24">
            <Link href="/">
              <img
                src="/images/kaya.svg"
                className="w-[60px] tablet:w-[140px] cursor-pointer"
              />
            </Link>
            <div className="laptop:flex justify-center space-x-112 flex-grow text-[#83817F] hidden">
              <Link href={`/`} key={"Product"}>
                <button
                  className={classnames("border-[#83817f] px-4 subheading1", {
                    "border-b-2":
                      _.includes(
                        `/${router.asPath.split("/")[1]}`,
                        "product"
                      ) || router.asPath === "/",
                  })}
                >
                  Product
                </button>
              </Link>
              <Link href={`/cart`} key="Cart">
                <div
                  className={classnames(
                    "border-[#83817f] px-4 subheading1 relative cursor-pointer",
                    {
                      "border-b-2": _.includes(
                        `/${router.asPath.split("/")[1]}`,
                        "cart"
                      ),
                    }
                  )}
                >
                  Cart
                  {CartContext.cart?.length > 0 && authContext.user.role.role_name === "buyer" && (
                    <div className="absolute top-[-4px] right-[-12px] text-white bg-red-400 rounded-full caption3 w-[16px] h-[16px]">
                      <p className="text-center">{CartContext.cart.length}</p>
                    </div>
                  )}
                </div>
              </Link>
              <Link href={`/history`} key="History">
                <button
                  className={classnames("border-[#83817f] px-4 subheading1", {
                    "border-b-2": _.includes(
                      `/${router.asPath.split("/")[1]}`,
                      "history"
                    ),
                  })}
                >
                  History
                </button>
              </Link>
              <Link href={`/member`} key="Member">
                <button
                  className={classnames("border-[#83817f] px-4 subheading1", {
                    "border-b-2": _.includes(
                      `/${router.asPath.split("/")[1]}`,
                      "member"
                    ),
                  })}
                >
                  Member
                </button>
              </Link>
            </div>

            {authContext.user?.role.role_name === "anonymous" ? (
              <button
                className="bg-[#367cb0] rounded-[42px] w-[112px] h-40 text-white cursor-pointer laptop:block hidden subheading2"
                onClick={() => router.push("/signin")}
              >
                login
              </button>
            ) : (
              <button className="bg-[#367cb0] rounded-[42px] w-[112px] h-40 text-white cursor-pointer laptop:block hidden subheading2" onClick={() => authContext.signout()}>
                logout
              </button>
            )}
            <button
              className="w-[24px] h-[24px] rounded-[4px] border border-white flex justify-center items-center laptop:hidden relative"
              onClick={() => {
                context.onOpenMenu();
              }}
            >
              <i className="text-white fas fa-bars"></i>
              {context.isMenuOpen && (
                <div className="absolute rounded-[3px] right-0 z-20 flex flex-col w-[36vw] top-[40px] divide-y divide-gray-300 bg-[#c4c4c4]">
                  {_.map(route, (route) => (
                    <p
                      className="py-8 text-[#83817F] subheading2"
                      onClick={() => router.push(route.path)}
                    >
                      {route.name}
                    </p>
                  ))}
                  {authContext.user?.role.role_name === "anonymous" ? (
                    <p
                      className="py-8 text-[#83817F] subheading2"
                      onClick={() => router.push("/signin")}
                    >
                      Login
                    </p>
                  ) : (
                    <p className="py-8 text-[#83817F] subheading2">Logout</p>
                  )}
                </div>
              )}
            </button>
          </div>
          <div
            className={classnames(
              "desktop:mx-auto tablet:mx-160 mx-16 min-h-[calc(100vh-48px)] tablet:min-h-[calc(100vh-64px)] desktop:min-h-[calc(100vh-96px)]",
              { "w-full": fullWidth },
              { "max-w-[1280px]": !fullWidth }
            )}
          >
            {children}
          </div>
          {context.isMenuOpen && (
            <div
              className="absolute top-0 left-0 z-10 w-screen h-screen"
              onClick={() => context.onCloseMenu()}
            ></div>
          )}
        </div>
      )}
    </Observer>
  );
}
