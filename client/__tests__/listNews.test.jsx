import ReactDOM from "react-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { News } from "../components/news";

describe("ListNews component", () => {
  it("shows loading screen", function () {
    const domElement = document.createElement("div");
    ReactDOM.render(<News />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("Shows title", async () => {
    const domElement = document.createElement("div");
    const news = [
      {
        author: "Cooljean",
        category: "sport",
        title: "title 1",
        text: "something",
      },
      {
        author: "Jon",
        category: "weather",
        title: "title 2",
        text: "something 2",
      },
    ];
    await act(async () => {
      ReactDOM.render(
        <BrowserRouter>
          <News listNews={() => news} />
        </BrowserRouter>,
        domElement
      );
    });

    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual(["News Articles", "title 1", "title 2"]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("Shows error message", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <BrowserRouter>
          <News
            listNews={() => {
              throw new Error("Something went wrong");
            }}
          />
        </BrowserRouter>,

        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Something went wrong"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
