import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add employee
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.role) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/employees/", form);
      setForm({ id: null, name: "", email: "", role: "" });
      fetchEmployees();
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  // Edit employee
  const handleEdit = (emp) => {
    setForm(emp);
    setIsEditing(true);
  };

  // Update employee
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/employees/${form.id}/`,
        form
      );
      setForm({ id: null, name: "", email: "", role: "" });
      setIsEditing(false);
      fetchEmployees();
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}/`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Management</h2>

      <div style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
        />
        {isEditing ? (
          <button onClick={handleUpdate} style={styles.updateBtn}>
            Update
          </button>
        ) : (
          <button onClick={handleAdd} style={styles.addBtn}>
            Add
          </button>
        )}
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={styles.td}>{emp.id}</td>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.role}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEdit(emp)}
                  style={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  updateBtn: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { backgroundColor: "#f2f2f2", padding: "10px" },
  td: { padding: "10px", borderBottom: "1px solid #ddd" },
  editBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default EmployeeCRUD;
