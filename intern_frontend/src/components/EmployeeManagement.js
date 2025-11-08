import React, { useState } from "react";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = { id: Date.now(), name, email, role };

    if (editIndex !== null) {
      // update existing employee
      const updated = [...employees];
      updated[editIndex] = newEmployee;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      // add new employee
      setEmployees([...employees, newEmployee]);
    }

    // clear inputs
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
      <h2>Employee Management</h2>
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
