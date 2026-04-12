import {useState} from "react";

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const handleUsernameChange = (e) => {setUsername(e.target.value)}
    const handlePasswordChange = (e) => {setPassword(e.target.value)}
    function handleRegister() {
        if(username.length<8||password.length<8){
            setError(true);
            setErrorMessage("Username and password cannot be less than 8 characters")
        }else if(!(/^[a-zA-Z0-9@#]*$/.test(username)&&/^[a-zA-Z0-9@#]*$/.test(password))){
            setError(true)
            setErrorMessage("Username and password cannot special characters")
        }else{
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
                if(res.status === 200){
                    window.location.href = '/login'
                }else if(res.status === 409){
                    setError(true);
                    setErrorMessage("User with this username already exists")
                }
                else{
                    setError(true);
                    setErrorMessage("Register failed. Please try again")
                }

            }

            )
        }
    }
    return(
        <>
            <h1>Register</h1>
            {error && <p>{errorMessage}</p>}
            <div className={"loginContainer"}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                <button onClick={handleRegister}>Register</button>
            </div>

        </>
    )
}
export default Register;