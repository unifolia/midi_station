import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { GlobalStyles } from "./styles/GlobalStyles";

console.log(
  "%cmidi",
  `
      display: block;
      font-family: 'Arial';
      font-size: 30px;
      text-align: center;
      color: black; background: #89CC04;
      padding: 30px;
      transform: scale(11);
     `
);

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/messenger">
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
