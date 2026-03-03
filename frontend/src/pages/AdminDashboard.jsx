import { useState, useEffect } from "react";
import API from "../api";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchLeaves = async () => {
    const res = await API.get("/leave/all");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (id, status) => {
    await API.put(`/admin/leave/${id}`, { status });
    fetchLeaves();
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Employee created!");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div style={{ padding: "20px" }}>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

      <h2>Admin Dashboard</h2>

      <h3>Create Employee</h3>
      <form onSubmit={handleCreateEmployee}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit">Create Employee</button>
      </form>

      <h3>Leave Requests</h3>

      {leaves.map((leave) => (
        <div key={leave._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p>Employee: {leave.employee?.name}</p>
          <p>Email: {leave.employee?.email}</p>
          <p>Leave Type: {leave.leaveType}</p>
          <p>Status: {leave.status}</p>

          {leave.status === "pending" && (
            <>
              <button onClick={() => handleApprove(leave._id, "approved")}>
                Approve
              </button>
              <button onClick={() => handleApprove(leave._id, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;