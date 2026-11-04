import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Master Styles & Responsive Styles
import "../css/style.css";
import "../css/responsive.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
