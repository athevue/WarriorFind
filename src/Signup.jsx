import "./Auth.css";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from './firebase';
import { useNavigate, Link } from "react-router-dom";


export default function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    //password requirements check 
    const passwordReqs = [
        { label: "At least 6 characters", test: (pass) => pass.length >= 6 },
        { label: "At least one uppercase letter", test: (pass) => /[A-Z]/.test(pass) },
        { label: "At least one lowercase letter", test: (pass) => /[a-z]/.test(pass) },
        { label: "At least one number", test: (pass) => /\d/.test(pass) },
        { label: "One special character", test: (pass) => /[^A-Za-z0-9]/.test(pass) },
    ];

    const reqCheck = passwordReqs.map((req) => req.test(password));
    const reqCheckPass = reqCheck.every(Boolean);
    const passwordMatch = password === confirmPassword;

    const handleSignUp = async(e) =>{
        e.preventDefault();
        setMessage("");
        if (!reqCheckPass) {
            setMessage("Password does not meet all requirements.");
            return;
        }

        if (!passwordMatch) {
            setMessage("Passwords do not match.");
            return;
        }
        try{
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCred.user;

            await setDoc(doc(db,"users", user.uid), {
                first_name: firstName,
                last_name: lastName,
                email,
                points: 0,
                badges: [],
                createdAt: new Date(),
            });

            setMessage("Account successfully created!");

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(()=>{
                navigate("/");
            }, 1000);

        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                setMessage("An account with this email already exists, Sign In instead");
            }else{
                setMessage("Failed to create account, please try again");
            }
        }
    };
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join WarriorFind to post and browse items.</p>

                <form className="auth-form" onSubmit={handleSignUp}>
                    <div className="auth-row">
                        <div className="auth-field">
                            <label>First Name</label>
                            <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Last Name</label>
                            <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="auth-field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="password-reqs">
                        {passwordReqs.map((req, index) => (
                            <p
                            key={index}
                            className={reqCheck[index] ? "req-pass" : "req-fail"}
                            >
                            {reqCheck[index] ? "✓" : "○"} {req.label}
                            </p>
                        ))}
                    </div>

                    <button className="auth-button" type="submit">Sign Up</button>
                    <div className="auth-switch">
                        <Link to="/signin">Already a user? Sign In!</Link>
                    </div>
                </form>
                {message && (
                    <p
                        className={`auth-message ${
                        message.includes("successfully") ? "success" : "error"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

