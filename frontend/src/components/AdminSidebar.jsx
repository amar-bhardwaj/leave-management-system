import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    localStorage.clear();
    window.location.href = "/login";
    navigate("/login");
  };

  const linkStyle = {
    display: "block",
    padding: "10px 10px",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    borderRadius: "4px"
  };

  const activeStyle = {
    background: "rgba(255,255,255,0.2)",
    fontWeight: "bold"
  };

  return (

    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1976d2",
        color: "white",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto"
      }}
    >

      <h2 style={{ marginBottom: "30px" }}>
        Admin Panel
      </h2>


      <NavLink
        to="/admin/dashboard"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Dashboard
      </NavLink>


      <NavLink
        to="/admin/create-employee"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Create Employee
      </NavLink>


      <NavLink
        to="/admin/employees"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Employees
      </NavLink>


      <NavLink
        to="/admin/leaves"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Leave Requests
      </NavLink>


      <NavLink
        to="/admin/reset-password"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Reset Password
      </NavLink>


      <hr style={{ margin: "20px 0", borderColor: "white" }} />


      <button
        onClick={logout}
        style={{
          padding: "10px 14px",
          border: "none",
          background: "white",
          color: "#1976d2",
          cursor: "pointer",
          borderRadius: "4px",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default AdminSidebar;