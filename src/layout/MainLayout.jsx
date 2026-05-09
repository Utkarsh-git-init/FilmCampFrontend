import Header from "../header/Header.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserContext} from "./UserContext.jsx";


const MainLayout = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const navigate=useNavigate();
    const [username, setUsername] = useState({});
    useEffect(() => {
        fetch(`${baseUrl}/user/isauthenticated`,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then(res => {
                if(res.status === 202) {
                    console.log("User is authenticated")
                    setAuthenticated(true)
                    return res.text();
                } else {
                    setAuthenticated(false)
                    console.log("User is not authenticated")
                    navigate("/login")
                }
            })
            .then(setUsername)
    },[])
    if(!authenticated){
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    return(
        <>
            <UserContext value={username}>
                <Header/>
                <Outlet/>
            </UserContext>
        </>
    )
}
export default MainLayout;