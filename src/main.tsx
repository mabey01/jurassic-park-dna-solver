import React from "react";
import ReactDOM from "react-dom/client";
import { OriginGridPage, ResultPage, TargetGridPage } from "./App";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createMemoryRouter([
  {
    path: "/",
    element: <OriginGridPage />,
  },
  {
    path: "/target-grid",
    element: <TargetGridPage />,
  },
  {
    path: "/results",
    element: <ResultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
