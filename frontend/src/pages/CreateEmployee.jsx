import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function CreateEmployee() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/users/create",
        {
          name,
          phone,
          password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Employee created successfully");

      setName("");
      setPhone("");
      setPassword("");

    } catch (error) {

      setMessage(
        error.response?.data?.message || "Error creating employee"
      );

    }

  };

  return (

    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>

      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px"
        }}
      >

        <h2>Create Employee</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "6px",
            width: "350px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >

          {message && (
            <p style={{ marginBottom: "10px", color: "green" }}>
              {message}
            </p>
          )}

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px"
            }}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select> */}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#1976d2",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Create Employee
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateEmployee;