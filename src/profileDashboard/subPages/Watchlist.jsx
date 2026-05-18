import {useEffect, useState} from "react";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Watchlist({username}) {
    const [watchlist, setWatchlist] = useState(null)
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+username+"/watchlist",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setWatchlist(data)
            })
    }, [username]);
    if (watchlist === null)
        return (
            <>Loading...</>
        )
    else if (watchlist.length === 0)
        return (
            <p>No movies in watchlist yet</p>
        )
    return (
        <div className={"watchlist-container"}>
            {
                watchlist.map(movie =>
                    <Link to={"/movie/"+movie.id} key={movie.id}>
                        <MovieCard movie={movie}/>
                    </Link>
                    )
            }
        </div>
    )
}
export default Watchlist;