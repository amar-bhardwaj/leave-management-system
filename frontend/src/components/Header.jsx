import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  return (
    <header className="main-header">

      <div className="header-left">
        {/* Company Logo */}
        <img
          src="/logo.png"
          alt="Company Logo"
          className="company-logo"
        />

        {/* Software Name */}
        <h2 className="software-name">
          Saanvi Technologies
          <span>Leave Management System</span>
        </h2>
      </div>

      <div className="header-right">

        <span className="user-role">
          {role ? role.toUpperCase() : ""}
        </span>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Header;