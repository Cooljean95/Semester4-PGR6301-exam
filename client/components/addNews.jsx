import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchJSON } from "./fetchJSON";

export function AddNews({ user, createNews }) {
  const [category, setCategory] = useState("Weather");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const res = await fetchJSON("/api/news");
    setArticle(res);
    console.log("gettitle", res);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let uniq = true;

    for (let i = 0; i < article.length; i++) {
      if (article[i].title === title) {
        uniq = false;
      }
    }

    if (uniq) {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          title: title,
          text: text,
          author: user,
        }),
      });
      for (let i = 0; i < 3; i++) {
        const sw = new WebSocket(window.location.origin.replace(/^http/, "ws"));
        const newsArticle = {
          author: user,
          category: category,
          title: title,
          text: text,
        };
        sw.onopen = () => sw.send(JSON.stringify(newsArticle));

        if (res.ok) {
          navigate("/frontPage");
        }
      }
    } else {
      alert("title already exist");
    }
    createNews({ title });
  }

  return (
    <div>
      <h1>Add new movie</h1>
      <div>
        <Link to={"/frontPage"}>Frontpage</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            required={true}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option>Weather</option>
            <option>Sport</option>
            <option>Food</option>
            <option>War</option>
            <option>Crimes</option>
          </select>
          <label>
            Title:
            <input
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </label>
        <label>
          Text:
          <textarea
            required={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button>Add movie</button>
      </form>
    </div>
  );
}
