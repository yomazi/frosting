import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { getEnvironmentInfo } from "./services/environment-service.js";

const rootElement = document.getElementById("root");

const envInfo = await getEnvironmentInfo();
console.log(
  `*** ${envInfo.environment} environment using ${envInfo.db} db ***`,
);

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
