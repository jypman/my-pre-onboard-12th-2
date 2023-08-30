import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Issues } from "./Issues/Issues";
import { Issue } from "./Issue";
import { Header } from "../components/Header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/issues",
    element: (
      <>
        <Header />
        <Issues />
      </>
    ),
  },
  {
    path: "/issues/:id",
    element: (
      <>
        <Header />
        <Issue />
      </>
    ),
  },
]);
