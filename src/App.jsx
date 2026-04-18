
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './login/Login.jsx'
import Register from './login/Register.jsx'
import HomePage from './homePage/HomePage.jsx'
import MovieCard from "./homePage/MovieCard.jsx";
import MoviePage from "./MoviePage/MoviePage.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/movie/:id' element={<MoviePage/>}/>
        </Routes>
    </>
  )
}

export default App
