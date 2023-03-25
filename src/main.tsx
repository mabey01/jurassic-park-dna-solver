import React from "react";
import ReactDOM from "react-dom/client";
import { OriginGridPage, ResultPage, TargetGridPage } from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { ErrorPage } from "./components/error-page/error-page";

const router = createHashRouter([
  {
    path: "/",
    element: <OriginGridPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:serializedOriginGrid",
    element: <TargetGridPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/results/:serializedOriginGrid/:serializedTargetGrid",
    element: <ResultPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
