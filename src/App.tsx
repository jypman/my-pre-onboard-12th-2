import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Routes";
import PageLayout from "./components/PageLayoyt";

function App() {
  return (
    <>
      <PageLayout>
        <RouterProvider router={router} />
      </PageLayout>
    </>
  );
}

export default App;
