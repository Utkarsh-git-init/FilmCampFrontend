import {useEffect, useState} from "react";

function HomePage() {
    const [authenticated, setAuthenticated] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        fetch(`${baseUrl}/isauthenticated`,
            {credentials: "include"})
        .then(res => {
            console.log("Response status: ", res.status, " headers: ", res.headers, " body: ", res.body, "")
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
        fetch(`${baseUrl}/logout`, {
            method: 'POST',
            credentials: "include"
        }).then(res => {
            if(res.status === 200) {
                console.log("Logout successful")
                window.location.href = '/login'
            }
        })
    }
    return(
        <>
            <h1>Home Page</h1>
            {authenticated && <div className={"loginContainer"}>
                <h2>You are authenticated</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            }
        </>
    )
}
export default HomePage;