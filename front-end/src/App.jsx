import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import NotesContainer from "./components/NotesContainer";
import CreateNote from "./components/CreateNote";

import LoginPage from "./components/login page";
import SignupPage from "./components/signup page";
function App() {
  const router = createBrowserRouter([
    {
      path: "/notescontainer",
      element: (
        <>
          <NavBar />
          <NotesContainer />
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
