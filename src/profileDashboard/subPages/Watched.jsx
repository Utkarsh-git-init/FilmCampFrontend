import {useEffect, useState} from "react";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Watched({username}){
    const [watched, setWatched] = useState(null)
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+username+"/watched",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setWatched(data)
            })
    }, [username]);
    if (watched === null)
        return (
            <>Loading...</>
        )
    else if (watched.length === 0)
        return (
            <p>No movies watched yet</p>
        )
    return(
        <>
            <div className={"watchlist-container"}>
                {
                    watched.map(movie =>
                        <Link to={"/movie/"+movie.id} key={movie.id}>
                            <MovieCard movie={movie}/>
                        </Link>)
                }
            </div>
        </>
    )
}
export default Watched;