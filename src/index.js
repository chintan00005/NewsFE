import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

// Register service worker (this enables PWA features)
serviceWorkerRegistration.register();
