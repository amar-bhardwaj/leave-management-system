import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users/all",
        { headers }
      );

      setEmployees(res.data);

    } catch (error) {

      console.log("Fetch employees error:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchEmployees();
  }, [token]);


  // CREATE EMPLOYEE
  const createEmployee = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/users/create",
        { name, phone, password },
        { headers }
      );

      alert("Employee created");

      setName("");
      setPhone("");
      setPassword("");

      fetchEmployees();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error creating employee"
      );

    }

  };


  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {

    if (!window.confirm("Delete employee?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/users/delete/${id}`,
        { headers }
      );

      fetchEmployees();

    } catch (error) {

      alert("Delete failed");

    }

  };


  // SEARCH FILTER
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.phone.includes(search)
  );


  if (loading) {
    return <div style={{padding:"40px"}}>Loading employees...</div>;
  }


  return (

    <div style={{ background:"#f4f6f9", minHeight:"100vh" }}>

      <AdminSidebar />

      <div style={{ marginLeft:"240px", padding:"30px" }}>

        <h2>Employees</h2>

        {/* SEARCH */}

        <input
          placeholder="Search employee..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            marginBottom:"20px",
            padding:"8px",
            width:"250px"
          }}
        />


        {/* CREATE EMPLOYEE */}

        <h3>Add New Employee</h3>

        <form
          onSubmit={createEmployee}
          style={{ marginBottom:"20px" }}
        >

          <input
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            style={{ marginRight:"10px", padding:"6px" }}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
            style={{ marginRight:"10px", padding:"6px" }}
          />

          <input
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{ marginRight:"10px", padding:"6px" }}
          />

          <button type="submit">
            Create
          </button>

        </form>


        {/* EMPLOYEE TABLE */}

        <table border="1" width="100%" cellPadding="10">

          <thead style={{ background:"#ddd" }}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="3" style={{textAlign:"center"}}>
                  No employees found
                </td>
              </tr>
            )}

            {filteredEmployees.map(emp => (

              <tr key={emp._id}>

                <td>{emp.name}</td>

                <td>{emp.phone}</td>

                <td>

                  <button
                    onClick={()=>deleteEmployee(emp._id)}
                    style={{marginRight:"10px"}}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Employees;