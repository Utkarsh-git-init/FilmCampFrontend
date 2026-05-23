import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MoviePageUpper from "./MoviePageUpper.jsx";
import MoviePageMiddle from "./MoviePageMiddle/MoviePageMiddle.jsx";
import UserMovieInteraction from "./UserMovieInteraction/UserMovieInteraction.jsx";
import ReviewSection from "./reviewSection/ReviewSection.jsx";
import './moviePage.css'

function MoviePage(){
    const {id}=useParams();
    const [movie,setMovie] = useState(null);
    const [error, setError] = useState(false);
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            if(res.status === 200)
                return res.json();
            setError(true)
        })
            .then(setMovie)
    },[]);
    if(!movie)
        return(
            <div className={"loader-container"}>
                {error?
                    <div>Connection timed out. [Reload Page]</div>
                    :
                    <div className="loader"></div>
                }
            </div>

        )

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