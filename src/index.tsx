/* eslint-disable prettier/prettier */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { links } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./services/AppContext";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  ...links.map((link) => {
    return {
      path: link.name.split(" ").length > 1 ? link.name.split(" ").join("-") : link.name,
      element: link?.component ? link.component : <>{link.name}</>,
    };
  }),
]);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
