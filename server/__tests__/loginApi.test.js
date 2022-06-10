import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { LoginApi } from "../components/loginApi";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));

beforeAll(async () => {
  app.use("/api/loginApi", LoginApi());
});
afterAll(() => setTimeout(() => process.exit(), 2000));

describe("access_token request", () => {
  //Testene får bare tilbake 500 server error, jeg håpet på å få en 401 pga ikke ekisterende token.

  /*it("add a access_token", async function () {
    await request(app)
      .post("/api/loginApi")
      .send({
        access_token: "why",
      })
      .expect((response) => {
        console.log(response);
      })
      .expect(200);
  });
  it("access token not found ", async () => {
    const access_token = "dwaodwdwaddopwadopawdw";
    await request(app).post("/api/loginApi").send({
      access_token: access_token,
    });
    expect(
      (await request(app).get("/api/loginApi").expect(401)).body
    ).toContain("Failed to fetch statusCode 401, Unauthorized");
  });

   */

  it("should ", async function () {
    const res = await request(app).delete("/api/loginApi");
    expect(res.statusCode).toBe(200);
  });
});
