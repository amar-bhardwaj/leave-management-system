import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function LeaveRequests() {

  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const perPage = 5;

  // FETCH LEAVES
  const fetchLeaves = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/leaves/all",
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


  // UPDATE LEAVE STATUS
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/leaves/update/${id}`,
        { status },
        { headers }
      );

      fetchLeaves();

    } catch (error) {

      alert("Error updating status");

    }

  };


  // FILTER LEAVES
  const filteredLeaves = leaves.filter(l => {

    if (filter === "all") return true;

    return l.status === filter;

  });


  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setPage(1);
  }, [filter]);


  // PAGINATION
  const start = (page - 1) * perPage;
  const currentLeaves = filteredLeaves.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredLeaves.length / perPage);


  if (loading) {
    return <div style={{padding:"40px"}}>Loading leave requests...</div>;
  }


  return (

    <div style={{ background:"#f4f6f9", minHeight:"100vh" }}>

      <AdminSidebar />

      <div style={{ marginLeft:"240px", padding:"30px" }}>

        <h2>Leave Requests</h2>

        {/* FILTER BUTTONS */}

        <div style={{ marginBottom:"20px" }}>

          <button onClick={()=>setFilter("all")}>
            All
          </button>

          <button
            onClick={()=>setFilter("pending")}
            style={{marginLeft:"10px"}}
          >
            Pending
          </button>

          <button
            onClick={()=>setFilter("approved")}
            style={{marginLeft:"10px"}}
          >
            Approved
          </button>

          <button
            onClick={()=>setFilter("rejected")}
            style={{marginLeft:"10px"}}
          >
            Rejected
          </button>

        </div>


        {/* LEAVE TABLE */}

        <table border="1" width="100%" cellPadding="10">

          <thead style={{background:"#ddd"}}>

            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {currentLeaves.length === 0 && (
              <tr>
                <td colSpan="7" style={{textAlign:"center"}}>
                  No leave requests found
                </td>
              </tr>
            )}

            {currentLeaves.map(leave => (

              <tr key={leave._id}>

                <td>{leave.employee?.name}</td>

                <td>{leave.leaveType}</td>

                <td>
                  {new Date(leave.fromDate).toLocaleDateString()}
                </td>

                <td>
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>

                <td>{leave.reason}</td>

                <td>{leave.status}</td>

                <td>

                  {leave.status === "pending" && (

                    <>
                      <button
                        onClick={()=>updateStatus(leave._id,"approved")}
                        style={{marginRight:"10px"}}
                      >
                        Approve
                      </button>

                      <button
                        onClick={()=>updateStatus(leave._id,"rejected")}
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


        {/* PAGINATION */}

        <div style={{marginTop:"20px"}}>

          {Array.from({length: totalPages}, (_,i) => (

            <button
              key={i}
              onClick={()=>setPage(i+1)}
              style={{
                marginRight:"5px",
                fontWeight: page === i+1 ? "bold" : "normal"
              }}
            >
              {i+1}
            </button>

          ))}

        </div>

      </div>

    </div>

  );

}

export default LeaveRequests;