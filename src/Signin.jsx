import { useState } from "react";
import "./Auth.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  //sign in functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Successfully signed in!");
      setTimeout(()=>{
        navigate("/");
      }, 1000);
    }catch(error){
      if(error.code === "auth/invalid-credential"){
        setMessage("Incorrect email or password");
      }else{
        setMessage("Failed to Sign in");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>

        <p className="auth-subtitle">
          Welcome back to WarriorFind.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="auth-button" type="submit">
            Sign In
          </button>
          <div className="auth-switch">
            <Link to="/signup">New to WarriorFind? Sign Up Now!</Link>
          </div>
        </form>
        {message && (
          <p
            className={`auth-message ${
              message.includes("Successfully") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}