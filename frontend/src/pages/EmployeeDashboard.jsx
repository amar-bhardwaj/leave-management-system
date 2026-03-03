import { useState, useEffect } from "react";
import API from "../api";

function EmployeeDashboard() {
    const [form, setForm] = useState({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: ""
    });

    const [leaves, setLeaves] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchLeaves = async () => {
        try {
            const res = await API.get("/leave/my");
            setLeaves(res.data);
        } catch (err) {
            alert("Error fetching leaves");
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/leave/apply", form);
            alert("Leave Applied");
            fetchLeaves();
        } catch (err) {
            alert("Error applying leave");
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

            
            <h2>Employee Dashboard</h2>

            <h3>Apply Leave</h3>
            <form onSubmit={handleSubmit}>
                <select name="leaveType" onChange={handleChange}>
                    <option value="">Select Leave Type</option>
                    <option value="full-day">Full Day</option>
                    <option value="half-day">Half Day</option>
                </select>
                <br />

                {form.leaveType === "half-day" && (
                    <>
                        <select name="halfDayType" onChange={handleChange}>
                            <option value="">Select Half</option>
                            <option value="first-half">First Half</option>
                            <option value="second-half">Second Half</option>
                        </select>
                        <br />
                    </>
                )}

                <input type="date" name="fromDate" onChange={handleChange} />
                <br />
                <input type="date" name="toDate" onChange={handleChange} />
                <br />
                <input name="reason" placeholder="Reason" onChange={handleChange} />
                <br />
                <button type="submit">Apply</button>
            </form>

            <h3>My Leaves</h3>
            {leaves.map((leave) => (
                <div key={leave._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                    <p>Type: {leave.leaveType}</p>
                    <p>From: {leave.fromDate?.substring(0, 10)}</p>
                    <p>To: {leave.toDate?.substring(0, 10)}</p>
                    <p>Status: {leave.status}</p>
                </div>
            ))}
        </div>
    );
}

export default EmployeeDashboard;