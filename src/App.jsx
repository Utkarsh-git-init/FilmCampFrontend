
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './login/Login.jsx'
import Register from './login/Register.jsx'
import HomePage from './homePage/HomePage.jsx'
import MoviePage from "./MoviePage/MoviePage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import SearchPage from "./searchPage/SearchPage.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route element={<MainLayout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/movie/:id' element={<MoviePage/>}/>
                <Route path='/search/:query' element={<SearchPage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
