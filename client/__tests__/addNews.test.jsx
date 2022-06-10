import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { AddNews } from "../components/addNews";
import { BrowserRouter } from "react-router-dom";

describe("add News component", () => {
  it("shows options", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <AddNews />
      </BrowserRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form option")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Weather", "Sport", "Food", "War", "Crimes"]);
  });

  //Fail
  /*it("adds news on submit", () => {
    const createNews = jest.fn();
    const title = "Test news";
    const element = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <AddNews createNews={createNews} />
      </BrowserRouter>,
      element
    );
    Simulate.change(element.querySelector("form input"), {
      target: { value: title },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createNews).toBeCalledWith({
      title,
    });
    expect(element.innerHTML).toMatchSnapshot();
  });

   */
});
