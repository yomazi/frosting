import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { login, logout } from "./redux/slices/auth-slice.js";
import { store } from "./redux/store.js";
import AuthService from "./services/auth-service.js";
import { getEnvironmentInfo } from "./services/environment.js";

const rootElement = document.getElementById("root");

const envInfo = await getEnvironmentInfo();
console.log(`*** ${envInfo.environmentId} environment using ${envInfo.dbId} db ***`);
initializeApp(envInfo.firebaseConfig);

if (!rootElement) {
  throw new Error("Root element not found");
}

AuthService.listenToAuthChanges(store.dispatch, login, logout);

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
