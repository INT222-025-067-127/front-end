import { Observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth_context";

export default function AuthLayout(props) {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.fetchMe();
  }, []);

  return <Observer>{() => <div>{props.children}</div>}</Observer>;
}
