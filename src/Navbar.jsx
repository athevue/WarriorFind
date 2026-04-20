import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      
      <div className="nav-logo">
        <Link to="/">WarriorFind</Link>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-actions ${open ? "active" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          <button className="nav-text">Home</button>  
        </Link>

        <Link to="/browse" onClick={() => setOpen(false)}>
          <button className="nav-text">Browse Items</button>
        </Link>

        <Link to="/create-post" onClick={() => setOpen(false)}>
          <button className="nav-text">Report Item</button>
        </Link>

        {/* <Link to="/signin" onClick={() => setOpen(false)}>
          <button className="nav-text">Sign In</button>
        </Link> */}

        <Link to="/signin" onClick={() => setOpen(false)}>
          <button className="nav-signup">Sign In/Up</button>
        </Link>
      </div>

    </nav>
  );
}