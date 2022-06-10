import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (username && password) {
      onLogin(username, password);
      navigate("/frontPage");
    } else if (!username && !password) {
      setPassword(undefined);
      setUsername(undefined);
      onLogin(username, password);
      navigate("/frontPage");
    } else {
      alert("You need to input both username and password, or none");
    }
  }

  return (
    <>
      <h1>Log inn</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Username:
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Password:
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </p>
          <button>Log inn/Guest</button>
        </form>
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/loginApi"}>Google login</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
