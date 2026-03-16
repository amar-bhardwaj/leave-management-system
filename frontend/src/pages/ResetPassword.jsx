import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function ResetPassword() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  const resetPassword = async () => {

    if (!phone || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.put(
        "http://localhost:5000/api/users/reset-password",
        { phone, password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password reset successful");

      setPhone("");
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

        <div style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px"
        }}>

          <input
            type="text"
            placeholder="Employee Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            style={{ padding:"10px", fontSize:"14px" }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{ padding:"10px", fontSize:"14px" }}
          />

          <button
            onClick={resetPassword}
            disabled={!phone || !password}
            style={{
              padding:"10px",
              background:"#1976d2",
              color:"white",
              border:"none",
              cursor:"pointer",
              borderRadius:"4px",
              fontWeight:"bold"
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