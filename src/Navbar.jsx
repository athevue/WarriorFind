import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        WarriorFind

        </div>

      <div className="nav-actions">
        <button className="nav-signin">Sign In</button>
        <button className="nav-signup">Sign Up</button>
      </div>
    </nav>
  );
}