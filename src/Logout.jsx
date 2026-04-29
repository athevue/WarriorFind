import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Auth.css";
import "./Navbar.css";
import "./Logout.css";

export default function Logout({setLogoutMessage}) {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setLogoutMessage("Successfully logged out!");

            setTimeout(()=>{
                setLogoutMessage("");
            }, 2500);
        } catch (error) {
            setLogoutMessage("Failed to log out");
            console.log(error);
        }
    };

    return (
        <button type="button" className="nav-signup" onClick={handleLogout}>
            Log Out
        </button>
    );
}