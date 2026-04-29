import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Logout from "./Logout";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // to check for authentication
  const [logoutMessage, setLogoutMessage] = useState("");

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      {logoutMessage && (
        <div className="logout-banner success">
          {logoutMessage}
        </div>
      )}
      
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

        {user && (
        <Link to="/create-post" onClick={() => setOpen(false)}>
          <button className="nav-text">Create Post</button>
        </Link>
        )}

        {/* <Link to="/signin" onClick={() => setOpen(false)}>
          <button className="nav-text">Sign In</button>
        </Link> */}

        {!user ?(
          <>
            <Link to="/signin" onClick={() => setOpen(false)}>
              <button className="nav-signup">Sign In</button>
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)}>
              <button className="nav-signup">Sign Up</button>
            </Link>
          </>
        ):(
        <Logout setLogoutMessage={setLogoutMessage}/>
        )}
      </div>

    </nav>
  );
}