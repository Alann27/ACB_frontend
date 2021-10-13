import React from "react";
import { Provider } from "react-redux";
import generateStore from "../redux/store.js";
import AppRouter from "../routers/AppRouter.js";
import Container from "./Container.jsx";

export function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}
