import { Router } from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import { fetchJSON } from "./fetchJSON.js";

export function LoginApi() {
  const router = new Router();
  router.use(bodyParser.json());

  router.get("/", async (req, res) => {
    const { access_token } = req.signedCookies;
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const userInfo = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (userInfo.ok) {
      res.json(await userInfo.json());
    } else {
      console.log(`Failed to fetch ${userInfo.status}, ${userInfo.statusText}`);
      res.sendStatus(500);
    }
  });

  router.post("/", (req, res) => {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    res.sendStatus(200);
  });

  router.delete("/", (req, res) => {
    res.clearCookie("access_token");
    res.sendStatus(200);
  });

  return router;
}
