import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import classnames from "classnames";
import _ from "lodash";
import { AuthContext } from "../contexts/auth_context";
import { mainLayoutContext } from "../contexts/main_layout_context";
import { Observer } from "mobx-react-lite";

const route = [
  { name: "Product", path: "/" },
  { name: "Cart", path: "/Cart" },
  { name: "Members", path: "/members" },
];

export default function MainLayout({ children, fullWidth = false }) {
  const router = useRouter();

  const context = useContext(mainLayoutContext);
  const authContext = useContext(AuthContext);

  return (
    <Observer>
      {() => (
        <div>
          <div className="mx-0 laptop:mx-112 bg-[#c4c4c4] tablet:h-[72px] desktop:h-[96px] rounded-none laptop:rounded-b-[24px] desktop:rounded-b-[48px] flex justify-between items-center h-48 px-24">
            <Link href="/">
              <img
                src="/images/kaya.svg"
                className="w-[60px] tablet:w-[140px]"
              />
            </Link>
            <div className="laptop:flex justify-center space-x-112 flex-grow text-[#83817F] hidden">
              {_.map(route, (route) => (
                <Link href={`${route.path}`} key={route.name}>
                  <button
                    className={classnames("border-[#83817f] px-4 subheading1", {
                      "border-b-2": _.includes(
                        `/${router.asPath.split("/")[1]}`,
                        route.path
                      ),
                    })}
                  >
                    {route.name}
                  </button>
                </Link>
              ))}
            </div>

            {authContext.user?.role === "anonymous" ? (
              <button
                className="bg-[#367cb0] rounded-[42px] w-[112px] h-40 text-white cursor-pointer laptop:block hidden subheading2"
                onClick={() => router.push("/signin")}
              >
                login
              </button>
            ) : (
              <div className="px-[36px] tablet:block hidden">
                <img
                  src="/images/user.svg"
                  className="w-40 h-40 rounded-full cursor-pointer"
                />
              </div>
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
