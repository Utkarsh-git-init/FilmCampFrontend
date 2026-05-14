import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../layout/UserContext.jsx";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Watchlist() {
    const user=useContext(UserContext);
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+user.userId+"/watchlist",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setWatchlist(data)
            })
    }, [user.userId]);
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