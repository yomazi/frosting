import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { login, logout } from "./redux/slices/authSlice.js";
import { store } from "./redux/store.js";
import { listenToAuthChanges } from "./services/auth-listener.js";
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

listenToAuthChanges(store.dispatch, login, logout);

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
