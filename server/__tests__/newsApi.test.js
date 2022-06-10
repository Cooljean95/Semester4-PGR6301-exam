import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { NewsApi } from "../components/news";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);

beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("pg6301-exam");
  await database.collection("News").deleteMany({});
  app.use("/api/news", NewsApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("news api", () => {
  it("add a new article", async function () {
    await request(app)
      .post("/api/news")
      .send({
        author: "Cooljean",
        category: "sport",
        title: "title 1",
        text: "something",
      })
      .expect(200);
    expect(
      (await request(app).get("/api/news").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("title 1");
  });
});
