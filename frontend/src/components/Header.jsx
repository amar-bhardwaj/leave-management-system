import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  return (
    <header className="main-header">

      <div className="header-left">

        <img
          src="/logo.png"
          alt="Company Logo"
          className="company-logo"
        />

        <div className="title-container">
          <h2>Saanvi Technologies</h2>
          <span>Leave Management System</span>
        </div>

      </div>

      <div className="header-right">

        {role && (
          <span className="user-role">
            {role.toUpperCase()}
          </span>
        )}

        {role && (
          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        )}

      </div>

    </header>
  );
}

export default Header;