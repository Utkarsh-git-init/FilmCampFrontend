import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviePageUpper from "./MoviePageUpper.jsx";

function MoviePage(){
    const {id}=useParams();
    const [movie,setMovie] = useState({});
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(setMovie)
    },[]);
    return (
        <>
            <MoviePageUpper movie={movie}/>
        </>
    )
}
export default MoviePage;