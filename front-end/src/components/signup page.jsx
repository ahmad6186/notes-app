import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignupPage() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
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
    if (!user.name || !user.email || !user.password) return;
    const newuser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const response = await fetch("http://localhost:5000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    });
    if (response.ok) {
      alert("Signup successful!");
      setuser({ name: "", email: "", password: "" });
      navigate("/"); // ✅ redirect here
    } else {
      alert("Signup failed.");
    }
  }
  return (
    <div className="flex bg-gray-400 justify-center items-center w-screen h-screen ">
      <form
        className="flex flex-col  bg-white  items-center rounded-3xl w-80 h-100 shadow-2xl"
        onSubmit={handlesumbit}
      >
        <h1 className="font-bold text-3xl m-10">Signup</h1>
        <input
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl "
          type="text"
          name="name"
          value={user.name}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl m-5"
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl"
          type="text"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-3.5 h-10 border-2 border-gray-600 rounded-2xl my-5 bg-black text-white hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
export default SignupPage;
