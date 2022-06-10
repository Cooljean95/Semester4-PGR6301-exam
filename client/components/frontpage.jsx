import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchJSON } from "./fetchJSON";

function ArticleLog({ article }) {
  return (
    <div>
      <strong>{article.author}</strong>
      <h1>{article.title}</h1>
      <h3>{article.category}</h3>
      <p>{article.text}</p>
    </div>
  );
}

export function Frontpage({ user, getUser }) {
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [newArticle, setNewArticle] = useState({});

  async function logOut() {
    const res = await fetch("/api/loginApi", {
      method: "delete",
    });
    if (res.ok) {
      navigate("/");
    }
  }

  useEffect(() => {
    const sw = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    sw.onmessage = (event) => {
      const val = JSON.parse(event.data);
      setNewArticle(val);
    };
  }, [newArticle]);

  useEffect(async () => {
    setLoading(true);
    await google();
    await getTitle();
    setLoading(false);
  }, []);

  async function google() {
    try {
      const res = await fetchJSON("/api/loginApi");
      const user = res.name;
      console.log("res", res);
      setName(user);
    } catch (error) {
      console.log(error);
      setName("");
      setLoading(false);
    }
  }

  async function getTitle() {
    const res = await fetchJSON("/api/news");
    setNews(res);
    setLoading(false);
  }

  if (loading) {
    return <div>Loading wait..</div>;
  }

  if (name) {
    getUser(name);
  }

  if (!name) {
    if (user) {
      return (
        <div className={"frontPage3"}>
          <header>
            <div>
              <Link to={"/profile"}>Profile</Link>
            </div>
            <div>
              <Link to={"/news"}>News</Link>
            </div>
            <div>
              <button onClick={logOut}>Log out</button>
            </div>
            <div>
              <h3>welcome: {user}</h3>
            </div>
          </header>
          <main>
            <div className={"mainDiv"}>
              <h1>News articles</h1>
              {Object.keys(news).map((i) => (
                <div key={i}>
                  <p>{news[i].title}</p>
                </div>
              ))}
            </div>
            <div className={"mainDivTwo"}>
              <h1>Articles</h1>
              <ArticleLog article={newArticle} />
            </div>
          </main>
        </div>
      );
    } else {
      return (
        <div className={"frontPage2"}>
          <header>
            <div>
              <Link to={"/news"}>News</Link>
            </div>
            <div>
              <button onClick={logOut}>Log out</button>
            </div>
            <div>
              <h3>welcome: Guest</h3>
            </div>
          </header>
          <main>
            <div className={"mainDiv"}>
              <h1>News articles</h1>
              {Object.keys(news).map((i) => (
                <div key={i}>
                  <p>{news[i].title}</p>
                </div>
              ))}
            </div>
            <div className={"mainDivTwo"}>
              <h1>Articles</h1>
              <ArticleLog article={newArticle} />
            </div>
          </main>
        </div>
      );
    }
  }

  return (
    <div className={"frontPage"}>
      <header>
        <div>
          <Link to={"/profile"}>Profile</Link>
        </div>
        <div>
          <Link to={"/news"}>News</Link>
        </div>
        <div>
          <Link to={"/news/new"}>Add News</Link>
        </div>
        <div>
          <Link to={"/news/update"}>Update News</Link>
        </div>
        <div>
          <button onClick={logOut}>Log out</button>
        </div>
        <div>
          <h3>welcome: {name}</h3>
        </div>
      </header>
      <main>
        <div className={"mainDiv"}>
          <h1>News articles</h1>
          {Object.keys(news).map((i) => (
            <div key={i}>
              <p>{news[i].title}</p>
            </div>
          ))}
        </div>
        <div className={"mainDivTwo"}>
          <h1>Articles</h1>
          <ArticleLog article={newArticle} />
        </div>
      </main>
    </div>
  );
}
