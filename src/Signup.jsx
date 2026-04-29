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

    const navigate = useNavigate();

    const handleSignUp = async(e) =>{
        e.preventDefault();
        setMessage("");
        try{
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCred.user;

            await setDoc(doc(db,"users", user.uid),{
                firstName,
                lastName,
                email,
                createdAt: new Date(),
            });

            setMessage("Account successfully created!");

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");

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
                    <div className="auth-field">
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="auth-field">
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="auth-field">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

