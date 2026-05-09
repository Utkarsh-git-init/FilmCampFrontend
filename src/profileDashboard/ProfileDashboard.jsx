import { IoPersonOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import './ProfileDashboard.css'
import {UserContext} from "../layout/UserContext.jsx";
import {useContext} from "react";
import RecentActivity from "./recentActivity/RecentActivity.jsx";

function ProfileDashboard() {
    const navigate=useNavigate();
    const user=useContext(UserContext);
    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return(
        <>
            <div className="profile-dashboard-container">
                <div>
                    <IoPersonOutline size={50} />
                    <p>{user && typeof user === 'string' ? user : "Guest"}</p>
                    <RecentActivity/>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}
export default ProfileDashboard;

