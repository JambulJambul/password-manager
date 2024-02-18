import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Homepage from "./pages/Homepage/index.jsx";
import DetailPage from "./pages/DetailPage/index.jsx";
import CreateAccountPage from "./pages/CreateAccountPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/:category",
    element: <Homepage />,
  },
  {
    path: "/details/:id",
    element: <DetailPage />,
  },
  {
    path: "/create-account",
    element: <CreateAccountPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);