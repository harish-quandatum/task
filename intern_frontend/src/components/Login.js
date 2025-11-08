import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', formData);

      // safely handle response
      if (res && res.data && res.data.message) {
        alert(res.data.message);
        localStorage.setItem('user', JSON.stringify(res.data)); // optional
      } else {
        alert('Login successful');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Invalid credentials';
      alert(errorMsg);
    }
  };

  return (
    <div className="container">
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
