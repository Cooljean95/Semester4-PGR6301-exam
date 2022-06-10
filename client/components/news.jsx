import React from "react";
import { useLoader } from "./useLoader";
import { Link } from "react-router-dom";

function Card({ news: { category, title, text, author } }) {
  return (
    <>
      <h1>{title}</h1>
      <h3>{category}</h3>
      <h4>{author}</h4>
      <div>{text}</div>
    </>
  );
}

export function News({ listNews }) {
  const { loading, error, data } = useLoader(listNews);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>News Articles</h1>
      <header>
        <ul>
          <li>
            <Link to={"/frontPage"}>Go to Front page</Link>
          </li>
        </ul>
      </header>

      {data.map((news) => (
        <Card key={news.title} news={news} />
      ))}
    </div>
  );
}
