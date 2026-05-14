import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../layout/UserContext.jsx";
import MovieCard from "../../movieCard/MovieCard.jsx";
import './watchlist.css'
import {Link} from "react-router-dom";

function Liked(){
    const user=useContext(UserContext);
    const [liked, setLiked] = useState([])
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/u/"+user.userId+"/liked",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setLiked(data)
            })
    }, [user.userId]);
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