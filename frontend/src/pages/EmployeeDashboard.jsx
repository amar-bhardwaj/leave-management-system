import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDashboard() {

  const [leaves, setLeaves] = useState([]);

  const [leaveType, setLeaveType] = useState("full-day");
  const [halfDayType, setHalfDayType] = useState("first-half");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");


  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  //token
  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("phone");

  const headers = {
    Authorization: `Bearer ${token}`
  };


  // FETCH MY LEAVES
  const fetchLeaves = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leaves/my",
        { headers }
      );

      setLeaves(res.data);

    } catch (error) {

      console.log("Fetch leaves error:", error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchLeaves();
  }, [token]);


  // APPLY LEAVE
  const applyLeave = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/leaves/apply",
        {
          leaveType,
          halfDayType,
          fromDate,
          toDate,
          reason
        },
        { headers }
      );

      alert("Leave Applied Successfully");

      // reset form
      setLeaveType("full-day");
      setHalfDayType("first-half");
      setFromDate("");
      setToDate("");
      setReason("");

      fetchLeaves();

    } catch (error) {

      console.log("Leave apply error:", error.response);

      alert(
        error.response?.data?.message ||
        "Error applying leave"
      );

    }

  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";

  };


  if (loading) {
    return <div style={{ padding: "40px" }}>Loading dashboard...</div>;
  }


  return (

    <div style={{
      backgroundColor: "#f4f6f9",
      minHeight: "100vh",
      color: "#333"
    }}>


      {/* HEADER */}

      <div style={{
        background: "#1976d2",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <div>
          <h2>Employee Dashboard</h2>
          <p style={{ margin: 0 }}>
            {/* Hi {name} ({phone}) */}
            Hi {name ? `${name} (${phone})` : "Employee"}
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </div>


      <div style={{ padding: "20px" }}>


        {/* APPLY LEAVE */}

        <h3>Apply Leave</h3>

        <form onSubmit={applyLeave}>

          <div>
            <label>Leave Type</label>
            <br />

            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="full-day">Full Day</option>
              <option value="half-day">Half Day</option>
            </select>

          </div>


          {leaveType === "half-day" && (

            <div>

              <label>Half Day Type</label>
              <br />

              <select
                value={halfDayType}
                onChange={(e) => setHalfDayType(e.target.value)}
              >
                <option value="first-half">First Half</option>
                <option value="second-half">Second Half</option>
              </select>

            </div>

          )}


          <div>

            <label>From Date</label>
            <br />

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />

          </div>


          <div>

            <label>To Date</label>
            <br />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />

          </div>


          <div>

            <label>Reason</label>
            <br />

            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />

          </div>


          <button
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Apply Leave
          </button>

        </form>


        {/* MY LEAVES */}

        <h3 style={{ marginTop: "40px" }}>
          My Leaves
        </h3>

        <table border="1" width="100%" cellPadding="10">

          <thead style={{ backgroundColor: "#e3e3e3" }}>

            <tr>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Applied Time</th>
            </tr>

          </thead>

          <tbody>

            {leaves.length === 0 && (

              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No leave records
                </td>
              </tr>

            )}

            {leaves.map((leave) => (

              <tr key={leave._id}>

                {/* <td>{leave.leaveType}</td> */}

                <td>
                  {leave.leaveType === "half-day"
                    ? `Half Day (${leave.halfDayType === "first-half" ? "First Half" : "Second Half"})`
                    : "Full Day"}
                </td>

                <td>
                  {new Date(leave.fromDate).toLocaleDateString()}
                </td>

                <td>
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>

                <td>{leave.status}</td>

                <td>
                  {new Date(leave.createdAt).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default EmployeeDashboard;