import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginCallBack() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    if (!access_token) {
      setError("Missing access token");
      return;
    }

    const res = await fetch("/api/loginApi", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    if (res.ok) {
      navigate("/frontPage");
    } else {
      setError(`Failed api login ${res.status}, ${res.statusText}`);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
      <h1>Please wait....</h1>
    </>
  );
}
