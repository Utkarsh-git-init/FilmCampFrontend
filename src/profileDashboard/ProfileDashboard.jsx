import { IoPersonOutline } from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import './ProfileDashboard.css'
import {UserContext} from "../layout/UserContext.jsx";
import {useContext, useState} from "react";
import RecentActivity from "./recentActivity/RecentActivity.jsx";
import Watchlist from "./subPages/Watchlist.jsx";
import Liked from "./subPages/Likes.jsx";
import Watched from "./subPages/Watched.jsx";

function ProfileDashboard() {
    const navigate=useNavigate();
    const {username}=useParams()
    const {user:principalUser, authenticated:authenticated}=useContext(UserContext)
    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }
    const [profile, setProfile] = useState(true)
    const [watchlist, setWatchlist] = useState(false)
    const [watched, setWatched] = useState(false)
    const [likes, setLikes] = useState(false)
    function handleProfileButtonClick() {
        setProfile(true)
        setWatchlist(false)
        setWatched(false)
        setLikes(false)
    }
    function handleWatchlistButtonClick() {
        setProfile(false)
        setWatchlist(true)
        setWatched(false)
        setLikes(false)
    }
    function handleWatchedButtonClick() {
        setProfile(false)
        setWatchlist(false)
        setWatched(true)
        setLikes(false)
    }
    function handleLikesButtonClick() {
        setProfile(false)
        setWatchlist(false)
        setWatched(false)
        setLikes(true)
    }
    return(
        <>
            <div className="profile-dashboard-container">
                <div>
                    <div>
                        <IoPersonOutline size={50} />
                        <p>{username}</p>
                    </div>
                    <div className={"dashboard-header"}>
                        <button onClick={handleProfileButtonClick}>Profile</button>
                        <button onClick={handleWatchlistButtonClick}>Watchlist</button>
                        <button onClick={handleWatchedButtonClick}>Watched</button>
                        <button onClick={handleLikesButtonClick}>Likes</button>
                    </div>
                    {profile && <RecentActivity username={username}/>}
                    {watchlist && <Watchlist username={username}/>}
                    {watched && <Watched username={username}/>}
                    {likes && <Liked username={username}/>}
                </div>
                {authenticated && principalUser.username===username &&
                    <button onClick={handleLogout}>Logout</button>
                }
            </div>
        </>
    )
}
export default ProfileDashboard;

