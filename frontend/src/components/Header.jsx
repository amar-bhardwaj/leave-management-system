import "./Header.css";

function Header() {
  return (
    <header className="main-header">
      
      <div className="header-left">
        {/* Company Logo */}
        <img
          src="../logo.png"
          alt="Company Logo"
          className="company-logo"
        />

        {/* Software Name */}
        <h2 className="software-name">
          LeaveMS
          <span>Employee Leave Management System</span>
        </h2>
      </div>

    </header>
  );
}

export default Header;