import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Make sure filename matches (API.js or api.js)

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save full user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Redirect based on role
    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }

  } catch (err) {
    console.log(err);
    alert("Invalid credentials");
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;