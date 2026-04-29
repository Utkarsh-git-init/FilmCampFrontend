import {useEffect, useState} from "react";
import TrendingSection from "./TrendingSection.jsx";
import './homePage.css'
import {useNavigate} from "react-router-dom";

function HomePage() {
    const [authenticated, setAuthenticated] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const navigate=useNavigate();
    useEffect(() => {
        fetch(`${baseUrl}/user/isauthenticated`,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            )
        .then(res => {
            if(res.status === 202) {
                console.log("User is authenticated")
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
                console.log("User is not authenticated")
                navigate("/login")
            }
        })
    },[])
    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <>
            {!authenticated && <div>
                <h2>PLEASE WAIT WHILE BACKEND LOADS</h2>
            </div>}
            {authenticated &&
                <div className={"homepageContainer"}>
                    <div>
                        <div className="trendingSectionHomepageDiv">
                            <label>Trending Today</label>
                            <TrendingSection/>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                </div>
            }
        </>
    )
}
export default HomePage;