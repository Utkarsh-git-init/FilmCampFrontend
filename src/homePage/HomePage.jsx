import {useEffect, useState} from "react";
import TrendingSection from "./TrendingSection.jsx";
import './homePage.css'

function HomePage() {
    const [authenticated, setAuthenticated] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
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
                window.location.href = '/login'
            }
        })
    },[])
    function handleLogout() {
        localStorage.removeItem("token")
        window.location.href = '/'
    }
    return(
        <>
            <h1>FILMCAMP</h1>
            {!authenticated && <div>
                <h2>PLEASE WAIT WHILE BACKEND LOADS</h2>
            </div>}
            {authenticated && <div className={"loginContainer"}>
                <div>
                    <div className="trendingSectionHomepageDiv">
                        <label>Trending Today</label>
                        <TrendingSection/>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
            }
        </>
    )
}
export default HomePage;