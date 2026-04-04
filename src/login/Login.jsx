import {useState} from "react";
import './login.css'
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const handleUsernameChange = (e) => {setUsername(e.target.value)}
    const handlePasswordChange = (e) => {setPassword(e.target.value)}
    function handleLogin() {
        const baseUrl=import.meta.env.VITE_API_BASE_URL
        fetch(`${baseUrl}/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username: username,
                password: password
            }),
            credentials: "include"   // 🔥 VERY IMPORTANT
        }).then(res => {
            if(res.status === 200) {
                console.log("Login successful")
                window.location.href = '/'
            } else if(res.status === 401) {
                console.log("Login failed")
                setError(true)
            }
        })
    }
    return(
        <>
            <h1>Login</h1>
            <div className={"loginContainer"}>
                <p>Don't have an account?</p>
                <Link to={"/register"}>SignUp</Link>
                {error && <p>Invalid username or password</p>}
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                <button onClick={handleLogin}>Login</button>
            </div>

        </>
    )
}
export default Login