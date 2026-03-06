import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Sort newest first
      const sortedLeaves = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setLeaves(sortedLeaves);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/leaves/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);

  const sortedLeaves =
    sortOrder === "Newest"
      ? [...filteredLeaves].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [...filteredLeaves].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

  return (
    <div className="admin-container">
      
      {/* HEADER */}
      <header className="header">
        <div className="logo-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="logo"
          />
          <h2>Smart Leave Manager</h2>
        </div>
      </header>

      <h1 className="title">Admin Dashboard</h1>

      {/* FILTER + SORT */}
      <div className="controls">
        <div>
          <label>Filter:</label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Sort:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* LEAVE TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Reason</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedLeaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.employee?.name || "Employee"}</td>
                <td>{leave.reason}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td className={`status ${leave.status}`}>
                  {leave.status}
                </td>

                <td>
                  {leave.status === "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateStatus(leave._id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateStatus(leave._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}

export default AdminDashboard;