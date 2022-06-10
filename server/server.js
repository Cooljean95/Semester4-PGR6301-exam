import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { LoginApi } from "./components/loginApi.js";
import { MongoClient } from "mongodb";
import { NewsApi } from "./components/news.js";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
const wsServer = new WebSocketServer({ noServer: true });
const sockets = [];
const mongoClient = new MongoClient(process.env.MONGODB_URL);

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api/config", (req, res) => {
  res.json({
    response_type: "token",
    client_id: process.env.CLIENT_ID,
    discovery_endpoint:
      "https://accounts.google.com/.well-known/openid-configuration",
    scope: "email profile",
  });
});

mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use("/api/news", NewsApi(mongoClient.db(process.env.MONGODB_DATABASE)));
});
app.use("/api/loginApi", LoginApi());

wsServer.on("connected", (socket) => {
  sockets.push(socket);
  socket.on("message", (data) => {
    const { author, category, title, text } = JSON.parse(data);
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ author, category, title, text }));
    }
  });
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connected", socket, req);
    });
  });
});
