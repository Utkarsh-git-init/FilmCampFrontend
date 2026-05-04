import {useEffect, useState} from "react";
import {
    IoHeartOutline, IoHeart,
    IoEyeOutline, IoEye,
    IoBookmarkOutline, IoBookmark,
} from "react-icons/io5";
import './userMovieInteraction.css'

function UserMovieInteraction({movie}) {
    const [Watched, setWatched] = useState(false)
    const [liked, setLiked] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(false)
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
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
        setWatched(!Watched)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
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
        setLiked(!liked)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
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
        setInWatchlist(!inWatchlist)
        fetch(baseUrl+"/interactions/movie/update",{
            method:"POST",
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