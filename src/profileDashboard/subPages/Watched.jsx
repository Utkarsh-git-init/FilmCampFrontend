import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../layout/UserContext.jsx";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Watched(){
    const user=useContext(UserContext);
    const [watched, setWatched] = useState([])
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+user.userId+"/watched",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setWatched(data)
            })
    }, [user.userId]);
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