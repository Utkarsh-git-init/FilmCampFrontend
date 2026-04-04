import {useState} from "react";

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleUsernameChange = (e) => {setUsername(e.target.value)}
    const handlePasswordChange = (e) => {setPassword(e.target.value)}
    function handleRegister() {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:username,
                password:password
            })
        })
    }
    return(
        <>
            <h1>Register</h1>
            <div className={"loginContainer"}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                <button onClick={handleRegister}>Register</button>
            </div>

        </>
    )
}
export default Register;