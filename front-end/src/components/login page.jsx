import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    email: "ahmad@gmail.com",
    password: "1234",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handlesumbit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("userId", data._id);
      console.log(data);
      sessionStorage.setItem("sessionId", data.sessionId);
      sessionStorage.setItem("sessionExpiry", data.sessionExpiry);
      setuser({ email: "", password: "" });
      navigate("/notescontainer");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="flex bg-gray-400 justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col bg-white items-center rounded-3xl w-80 shadow-2xl"
        onSubmit={handlesumbit}
      >
        <h1 className="font-bold text-3xl m-10">Login</h1>

        <input
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl m-5"
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl my-5 bg-black text-white hover:bg-blue-600"
        >
          Login
        </button>

        <div className="text-sm mb-5">
          Don't have an account?{" "}
          <Link to="/signuppage" className="font-bold hover:text-blue-600">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
