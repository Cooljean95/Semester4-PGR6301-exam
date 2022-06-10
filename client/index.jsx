import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./components/login";
import { LoginApi } from "./components/loginApi";
import { LoginCallBack } from "./components/loginCallBack";
import { fetchJSON } from "./components/fetchJSON";
import { useLoader } from "./components/useLoader";
import { News } from "./components/news";
import { AddNews } from "./components/addNews";
import { Frontpage } from "./components/frontpage";

function Profile({ user }) {
  const { loading, data, error } = useLoader(async () => {
    return await fetchJSON("/api/loginApi");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }
  if (error) {
    if (user) {
      return (
        <div>
          <h1>Username: {user}</h1>
          <h2>You should log in with google </h2>
          <Link to={"/frontPage"}>Front page</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/"}>Log inn</Link>
          <div>Error! {error.toString()}</div>
        </div>
      );
    }
  }

  return (
    <>
      <h1>Profile</h1>
      <header>
        <ul>
          <li>
            <Link to={"/frontPage"}>Go to front page</Link>
          </li>
        </ul>
      </header>
      <div>
        <h1>Profile name: {user}</h1>
        <h3>Profile email: {data.email}</h3>
        <div>
          <img src={data.picture} />
        </div>
      </div>
    </>
  );
}

function UpdateNews() {
  return (
    <>
      <Link to={"/frontPage"}> FrontPage</Link>
    </>
  );
}

export const LoginContextGoogle = React.createContext();

function Application() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function listNews() {
    return await fetchJSON("/api/news");
  }

  useEffect(() => {
    setUsername(window.sessionStorage.getItem("username"));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("username", username);
  }, [username]);

  const { loading, error, data } = useLoader(() => fetchJSON("/api/config"));

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  function login(user, passW) {
    setUsername(user);
    setPassword(passW);
  }

  return (
    <LoginContextGoogle.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route
            path="frontPage"
            element={
              <Frontpage
                getUser={(username) => setUsername(username)}
                user={username}
              />
            }
          />
          <Route path="profile" element={<Profile user={username} />} />
          <Route path="/" element={<Login onLogin={login} />} />
          <Route path="loginApi" element={<LoginApi />} />
          <Route path="login/callback" element={<LoginCallBack />} />
          <Route path="news" element={<News listNews={listNews} />} />
          <Route path="news/new" element={<AddNews user={username} />} />
          <Route path="news/update" element={<UpdateNews />} />
        </Routes>
      </BrowserRouter>
    </LoginContextGoogle.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
