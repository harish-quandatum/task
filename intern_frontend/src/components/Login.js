import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";



const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", formData);

      if (res && res.data) {
        alert(res.data.message || "Login successful!");
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
        // ✅ Redirect to employee management page
        navigate("/employees");
      } else {
        alert("Login successful!");
        navigate("/employees");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid credentials";
      alert(errorMsg);
    }
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>Intern Portal</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
