import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviePageUpper from "./MoviePageUpper.jsx";
import MoviePageMiddle from "./MoviePageMiddle/MoviePageMiddle.jsx";
import UserMovieInteraction from "./UserMovieInteraction/UserMovieInteraction.jsx";
import ReviewSection from "./reviewSection/ReviewSection.jsx";

function MoviePage(){
    const {id}=useParams();
    const [movie,setMovie] = useState(null);
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(setMovie)
    },[]);
    if(!movie) return <p>Loading...</p>
    return (
        <>
            <div>
                <MoviePageUpper movie={movie}/>
                <UserMovieInteraction movie={movie}/>
                <MoviePageMiddle movie={movie}/>
                <ReviewSection movie={movie}/>
            </div>

        </>
    )
}
export default MoviePage;