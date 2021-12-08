import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth_context";

const pagePermission = new Map<
  string,
  Array<"admin" | "buyer" | "anonymous">
>();
pagePermission.set("/404", ["admin", "buyer", "anonymous"]);
pagePermission.set("/401", ["admin", "buyer", "anonymous"]);
pagePermission.set("/signin", ["admin", "buyer", "anonymous"]);
pagePermission.set("/signup", ["admin", "buyer", "anonymous"]);

pagePermission.set("/cart", ["buyer"]);
pagePermission.set("/member", ["admin", "buyer", "anonymous"]);
pagePermission.set("/history", ["buyer"]);

pagePermission.set("/", ["admin", "buyer", "anonymous"]);
pagePermission.set("/product/[id]", ["admin", "buyer", "anonymous"]);
pagePermission.set("/product/[id]/edit", ["admin"]);
pagePermission.set("/product/add", ["admin"]);

export default function PermissionLayout(props) {
  const authContext = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (
      !pagePermission
        .get(router.pathname)
        ?.includes(authContext.user.role.role_name) &&
      router.pathname !== "/404" && router.pathname !== "/401" 
    ) {
      router.push("/401");
    }
  }, [router.asPath]);

  return <Observer>{() => <div>{props.children}</div>}</Observer>;
}
