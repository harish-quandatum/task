import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EmployeeManagement from "./components/EmployeeManagement"; // ✅ rename this import

function App() {
  return (
    <div className="App">
      <h1>Intern Portal</h1>
      <Register />
      <hr />
      <Login />
      <hr />
      <UserList />
      <hr />
      <EmployeeManagement /> {/* ✅ correct component name */}
    </div>
  );
}

export default App;
