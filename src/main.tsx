import React from "react";
import ReactDOM from "react-dom/client";
import { OriginGridPage, ResultPage, TargetGridPage } from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <OriginGridPage />,
  },
  {
    path: "/:serializedOriginGrid",
    element: <TargetGridPage />,
  },
  {
    path: "/results/:serializedOriginGrid/:serializedTargetGrid",
    element: <ResultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
