import Header from "../header/Header.jsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserContext} from "./UserContext.jsx";


const MainLayout = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`${baseUrl}/user/isauthenticated`,
            {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            .then( async res => {
                if(res.status === 202) {
                    console.log("User is authenticated")
                    const data = await res.json();
                    setUser(data)
                    setAuthenticated(true)
                } else {
                    setAuthenticated(false)
                    console.log("User is not authenticated")
                }
            })
    },[baseUrl])
    return(
        <>
            <UserContext value={{user, authenticated}}>
                <Header/>
                <Outlet/>
            </UserContext>
        </>
    )
}
export default MainLayout;