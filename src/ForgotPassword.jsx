import {useState} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import { auth } from "./firebase";
import{Link} from "react-router-dom";
import './Auth.css';

export default function ForgotPassword(){
    const [resetMessage, setResetMessage] = useState(""); // success message after email is sent
    const [email,setEmail] = useState(""); // email input

    //handle password reset form submission
    async function handleResetPassword(e){
        e.preventDefault();
        setResetMessage("");

        // check if field is empty
        if(email.trim()==""){
            setError("Please enter your email");
            return;
        }
        try{
            //if user email exists, send password reset link
            await sendPasswordResetEmail(auth,email);
            setResetMessage("Password reset email sent! Check your inbox for next steps.");
            console.log("Reset sent");
        }catch(err){
            //debugging log for rest errors
            console.log("Reset Error:", err);
            console.log("Reset Code", err?.code);
            console.log("Reset Error:", err?.resetMessage);
            
            const code = err?.code;
            //handle invalid email format
            if(code === "auth/invalid-email"){
                setError("Please eneter a valid email address")
            }else{
                setResetMessage("If an account with that email exists, a reset link has been sent");
            }

        }
    }
    return(
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Forgot Password</h2>

                <p className="auth-subtitle">
                Enter your email to reset your password.
                </p>

                <form className="auth-form" onSubmit={handleResetPassword}>
                <div className="auth-field">
                    <label>Email</label>

                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="auth-button" type="submit">
                    Reset Password
                </button>
                </form>

                {resetMessage && (
                <p
                    className={`auth-message ${
                    resetMessage.includes("sent") ? "success" : "error"
                    }`}
                >
                    {resetMessage}
                </p>
                )}

                <div className="auth-switch">
                <Link to="/signin">Back to Sign In</Link>
                </div>
            </div>
        </div>
    );
}