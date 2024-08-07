import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/configureStore";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
