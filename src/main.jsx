import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth_context } from "./Context/Auth_context.jsx";

createRoot(document.getElementById("root")).render(
  <Auth_context>
    <App />
  </Auth_context>
);
