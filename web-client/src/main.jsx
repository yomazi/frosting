import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { getEnvironmentInfo } from "./services/environment.js";

const rootElement = document.getElementById("root");

const envInfo = await getEnvironmentInfo();
console.log(
  `*** ${envInfo.environment} environment using ${envInfo.db} db ***`,
);
initializeApp(envInfo.firebaseConfig);

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
