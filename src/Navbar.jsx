import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">WarriorFind</Link>
      </div>

      <div className="nav-actions">
        <Link to="/browse">
          <button className="nav-text">Browse</button>
        </Link>
        <Link to="/signin">
          <button className="nav-text">Sign In</button>
        </Link>

        <Link to="/signup"> 
          <button className="nav-signup">Sign Up</button>
        </Link>
        
      </div>
    </nav>
  );
}