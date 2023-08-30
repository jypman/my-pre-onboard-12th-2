import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Issues } from "./Issues";
import { Issue } from "./Issue";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/issues",
    element: <Issues />,
  },
  {
    path: "/issues/:id",
    element: <Issue />,
  },
]);
