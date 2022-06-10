import { Router } from "express";

export function NewsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const news = await mongoDatabase
      .collection("News")
      .find()
      .map(({ category, title, text, author }) => ({
        category,
        title,
        text,
        author,
      }))
      .limit(100)
      .toArray();
    res.json(news);
  });

  router.post("/", (req, res) => {
    const { category, title, text, author } = req.body;
    mongoDatabase.collection("News").insertOne({
      category,
      title,
      text,
      author,
    });
    res.sendStatus(200);
  });

  return router;
}
