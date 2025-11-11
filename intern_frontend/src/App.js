import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EmployeeManagement from "./components/EmployeeManagement";

function App() {
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route */}
        <Route
          path="/employees"
          element={
            isAuthenticated ? <EmployeeManagement /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
