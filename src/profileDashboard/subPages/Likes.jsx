import {useEffect, useState} from "react";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Liked({username}){
    const [liked, setLiked] = useState(null)
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+username+"/liked",{
            headers:{
                "Accept":"application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                setLiked(data)
            })
    }, [username]);
    if (liked === null)
        return (
            <>Loading...</>
        )
    else if (liked.length === 0)
        return (
            <p>No movies liked yet</p>
        )
    return(
        <>
            <div className={"watchlist-container"}>
                {
                    liked.map(movie =>
                        <Link to={"/movie/"+movie.id} key={movie.id}>
                            <MovieCard movie={movie}/>
                        </Link>)
                }
            </div>
        </>
    )
}
export default Liked;