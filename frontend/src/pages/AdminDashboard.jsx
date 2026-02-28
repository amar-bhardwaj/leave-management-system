import { useEffect, useState } from "react";
import API from "../utils/api";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/admin/leaves");
      setLeaves(res.data);
    } catch (err) {
      alert("Error fetching leaves");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/leave/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }} className="card">
      
      <button onClick={() => {
  localStorage.removeItem("token");
  window.location.href = "/";
}}>
  Logout
</button>

      <h2>Admin Dashboard</h2>


      {leaves.map((leave) => (
        <div key={leave._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          
          <p><strong>Employee ID:</strong> {leave.employee?._id}</p>
          <p><strong>Name:</strong> {leave.employee?.name}</p>
          <p><strong>Email:</strong> {leave.employee?.email}</p>

          <p><strong>Leave Type:</strong> {leave.leaveType}</p>

          {leave.leaveType === "half-day" && (
            <p><strong>Half:</strong> {leave.halfDayType}</p>
          )}

          <p><strong>From:</strong> {leave.fromDate?.substring(0,10)}</p>
          <p><strong>To:</strong> {leave.toDate?.substring(0,10)}</p>
          <p><strong>Status:</strong> {leave.status}</p>

          <button className="success" onClick={() => updateStatus(leave._id, "approved")}>
            Approve
          </button>

          <button className="danger" onClick={() => updateStatus(leave._id, "rejected")}>
            Reject
          </button>

        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;