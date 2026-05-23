import {useState} from "react";
import './login.css'
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleUsernameChange = (e) => {setUsername(e.target.value)}
    const handlePasswordChange = (e) => {setPassword(e.target.value)}
    function handleLogin() {
        setLoading(true);
        const baseUrl=import.meta.env.VITE_API_BASE_URL
        fetch(`${baseUrl}/user/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }).then(res => {
            if(res.status === 200) {
                return res.text()
            } else if(res.status === 401) {
                console.log("Login failed")
                setError(true)
            }
            setLoading(false);
            throw new Error("Login failed with status code: "+res.status)
        }).then(
            data => {
                if(data){
                    const token="Bearer "+data;
                    localStorage.setItem("token", token)
                    navigate("/")
                }
            }
        ).catch(err => {
            console.log(err)
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
                <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                {loading && <div className="LoginLoader"></div>}
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}
export default Login