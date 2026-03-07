import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function ResetPassword() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  const resetPassword = async () => {
    if (!userId || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/users/reset-password/${userId}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password reset successful");

      // Clear fields
      setUserId("");
      setPassword("");

    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    }
  };

  return (
    <div>
      <AdminSidebar />

      <div style={{ marginLeft: "240px", padding: "30px" }}>
        <h2>Reset Employee Password</h2>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", width: "300px", gap: "15px" }}>
          
          <input
            type="text"
            placeholder="Employee ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ padding: "10px", fontSize: "14px" }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", fontSize: "14px" }}
          />

          <button
            onClick={resetPassword}
            disabled={!userId || !password}
            style={{
              padding: "10px",
              background: "#1976d2",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
              fontWeight: "bold"
            }}
          >
            Reset Password
          </button>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
