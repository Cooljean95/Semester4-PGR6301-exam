import React, { useContext, useEffect } from "react";
import { fetchJSON } from "./fetchJSON";
import { LoginContextGoogle } from "../index";

export function LoginApi() {
  const { discovery_endpoint, client_id, response_type, scope } =
    useContext(LoginContextGoogle);
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);
    const parameters = {
      response_type,
      client_id,
      scope,
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <>
      <h1>Please wait...</h1>
    </>
  );
}
