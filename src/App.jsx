
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './login/Login.jsx'
import Register from './login/Register.jsx'
import HomePage from './homePage/HomePage.jsx'

function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </>
  )
}

export default App
