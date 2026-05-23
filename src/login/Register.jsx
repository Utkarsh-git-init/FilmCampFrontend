import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleUsernameChange = (e) => {setUsername(e.target.value)}
    const handlePasswordChange = (e) => {setPassword(e.target.value)}
    function handleRegister() {
        username.trim();
        password.trim();
        if(username.length<4){
            setError(true);
            setErrorMessage("Username cannot be less than 4 characters")
        }else if(password.length<8){
            setError(true);
            setErrorMessage("Password cannot be less than 8 characters")
        }else if(!(/^[a-zA-Z0-9_@]*$/.test(username)&&/^[a-zA-Z0-9_@]*$/.test(password))){
            setError(true)
            setErrorMessage("Username and password cannot contain special characters except underscore and @")
        }else{
            setLoading(true);
            setError(false);
            const baseUrl = import.meta.env.VITE_API_BASE_URL
            fetch(`${baseUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    password:password
                })
            }).then(res => {
                    if (res.status === 200) {
                        navigate("/login")
                    } else if (res.status === 409) {
                        setError(true);
                        setErrorMessage("User with this username already exists")
                        setLoading(false);
                    } else {
                        setError(true);
                        setErrorMessage("Register failed. Please try again")
                        setLoading(false);
                    }
                }
            )
        }
    }
    return(
        <>
            <h1>Register</h1>
            <p>Already have an account?</p>
            <Link to={"/login"}>Login</Link>
            {error && <p>{errorMessage}</p>}
            <div className={"loginContainer"}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                {loading && <div className="LoginLoader"></div>}
                <button onClick={handleRegister}>Register</button>
            </div>
        </>
    )
}

export default Register;