import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Issues } from "./Issues/Issues";
import { DetailIssue } from "./DetailIssue";
import { Header } from "../components/Header";
import { NotFound } from "./NotFound";
import { DetailIssueProvider } from "../providers/DetailIssueProvider";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
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
        <DetailIssueProvider>
          <DetailIssue />
        </DetailIssueProvider>
      </>
    ),
  },
]);
