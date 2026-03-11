import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {

  const [stats, setStats] = useState({
    employees: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const employeesRes = await axios.get(
          "http://localhost:5000/api/users/all",
          { headers }
        );

        const leavesRes = await axios.get(
          "http://localhost:5000/api/admin/leaves",
          { headers }
        );

        const leaves = leavesRes.data;

        const pending = leaves.filter(l => l.status === "pending").length;
        const approved = leaves.filter(l => l.status === "approved").length;
        const rejected = leaves.filter(l => l.status === "rejected").length;

        setStats({
          employees: employeesRes.data.length,
          pending,
          approved,
          rejected
        });

      } catch (error) {

        console.log("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchStats();

  }, [token]);


  if (loading) {
    return <div style={{ padding: "40px" }}>Loading Dashboard...</div>;
  }

  return (

    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>

      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px"
        }}
      >

        <h2 style={{ marginBottom: "30px" }}>
          Admin Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 260px)",
            gap: "20px"
          }}
        >

          <div
            style={{
              background: "#2196f3",
              color: "white",
              padding: "20px",
              borderRadius: "6px"
            }}
          >
            <h4>Total Employees</h4>
            <h2>{stats.employees}</h2>
          </div>

          <div
            style={{
              background: "#ff9800",
              color: "white",
              padding: "20px",
              borderRadius: "6px"
            }}
          >
            <h4>Pending Leaves</h4>
            <h2>{stats.pending}</h2>
          </div>

          <div
            style={{
              background: "#4caf50",
              color: "white",
              padding: "20px",
              borderRadius: "6px"
            }}
          >
            <h4>Approved Leaves</h4>
            <h2>{stats.approved}</h2>
          </div>

          <div
            style={{
              background: "#f44336",
              color: "white",
              padding: "20px",
              borderRadius: "6px"
            }}
          >
            <h4>Rejected Leaves</h4>
            <h2>{stats.rejected}</h2>
          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;