import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";

import LoginPage from "./components/login page";
import SignupPage from "./components/signup page";
import DashboardWithNotes from "./components/DashboardWithNotes";
function App() {
  const router = createBrowserRouter([
    {
      path: "/notescontainer",
      element: (
        <>
          <DashboardWithNotes />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <LoginPage />
        </>
      ),
    },
    {
      path: "/signuppage",
      element: (
        <>
          <SignupPage />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
