import {useContext, useEffect, useState} from "react";
import {
    IoHeartOutline, IoHeart,
    IoEyeOutline, IoEye,
    IoBookmarkOutline, IoBookmark,
} from "react-icons/io5";
import './userMovieInteraction.css'
import {UserContext} from "../../layout/UserContext.jsx";
import {useNavigate} from "react-router-dom";

function UserMovieInteraction({movie}) {
    const [Watched, setWatched] = useState(false)
    const [liked, setLiked] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const {authenticated:authenticated} = useContext(UserContext)
    const navigate=useNavigate();
    useEffect(() => {
        if(!authenticated)
            return;
        fetch(baseUrl+"/interactions/movie/"+movie.id,{
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(res => res.json())
            .then(data=> {
                setWatched(data.watched)
                setLiked(data.liked)
                setInWatchlist(data.in_watchlist)
            })
    }, [movie.id]);

    function handleWatched(){
        if(!authenticated) {
            navigate("/login")
            return
        }
        setWatched(!Watched)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
            keepalive:true,
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                movieId:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                watched:!Watched,
                liked:liked,
                rating:0.0,
                in_watchlist:inWatchlist,
            })
        })
    }
    function handleLiked(){
        if(!authenticated) {
            navigate("/login")
            return
        }
        setLiked(!liked)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
            keepalive:true,
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                movieId:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                watched:Watched,
                liked:!liked,
                rating:0.0,
                in_watchlist:inWatchlist,
            })
        })
    }
    function handleInWatchlist(){
        if(!authenticated) {
            navigate("/login")
            return
        }
        setInWatchlist(!inWatchlist)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
            keepalive:true,
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                movieId:movie.id,
                title:movie.title,
                poster_path:movie.poster_path,
                watched:Watched,
                liked:liked,
                rating:0.0,
                in_watchlist:!inWatchlist
            })
        })
    }
    return(
        <>
            <div className={"user-movie-interaction-container"}>
                <div onClick={handleWatched} className={"icon-container"}>
                    {Watched ?
                        <>
                            <IoEye color={"green"} className={"icon"}/>
                            <p>Watched</p>
                        </>
                        :
                        <>
                            <IoEyeOutline className={"icon"}/>
                            <p>Watch</p>
                        </>
                    }
                </div>
                <div onClick={handleLiked} className={"icon-container"}>
                    {liked ?
                        <>
                            <IoHeart color={"tomato"} className={"icon"}/>
                            <p>Liked</p>
                        </>
                        :
                        <>
                            <IoHeartOutline className={"icon"}/>
                            <p>Like</p>
                        </>
                    }
                </div>
                <div onClick={handleInWatchlist} className={"icon-container"}>
                    {inWatchlist ?
                        <>
                            <IoBookmark color={"deepSkyBlue"} className={"icon"}/>
                            <p>Remove</p>
                        </>
                        :
                        <>
                            <IoBookmarkOutline className={"icon"}/>
                            <p>Watchlist</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
export default UserMovieInteraction;