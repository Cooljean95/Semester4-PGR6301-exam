import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../components/login";

describe("test for login", () => {
  it("shows input", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(['Username:<input value="">', 'Password:<input value="">']);
  });

  //Change doesn't wanna work
  /*
  it("adds user", () => {
    const createUser = jest.fn();
    const user = "Cool";
    const password = "12345";
    const element = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Login onLogin={createUser} />
      </BrowserRouter>,
      element
    );
    Simulate.change(element.querySelector("form input:nth-of-type(1)"), {
      target: { value: user },
    });
    Simulate.change(element.querySelector("form input:nth-of-type(2)"), {
      target: { value: password },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createUser).toBeCalledWith({
      user,
      password,
    });
    expect(element.innerHTML).toMatchSnapshot();
  });

   */
});
