import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import NotesContainer from "./components/NotesContainer";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
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
      path: "/createnote",
      element: (
        <>
          <NavBar />
          <CreateNote />
        </>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <>
          <NavBar />
          <EditNote />
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
