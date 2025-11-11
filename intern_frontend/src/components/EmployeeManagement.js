import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  // ✅ Load employees from localStorage when page loads
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  // ✅ Save employees to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = { id: Date.now(), name, email, role };

    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = newEmployee;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, newEmployee]);
    }

    setName("");
    setEmail("");
    setRole("");
  };

  const handleEdit = (index) => {
    const emp = employees[index];
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 40px" }}>
        <h2>Employee Management</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit" style={{ backgroundColor: "green", color: "white" }}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "80%",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Role</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "10px" }}>
                No employees added yet
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr key={emp.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{emp.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{emp.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{emp.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{emp.role}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{ marginRight: "8px", backgroundColor: "orange", color: "white" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeManagement;
