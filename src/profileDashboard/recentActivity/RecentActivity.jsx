import {useEffect, useState} from "react";
import './recentActivity.css'
import MovieCard from "../../movieCard/MovieCard.jsx";
import {Link} from "react-router-dom";

function RecentActivity() {
    const [recentActivity, setRecentActivity] = useState([])
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/interactions/recent_activity",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(setRecentActivity)
    }, []);
    return(
        <div className={"recent-activity-container"}>
            <label className={"recent-activity-title"}>Recent Activity</label>
            <div className={"recent-activity-movie-card-section"}>
                {recentActivity.length === 0 ?
                    Array(4).fill(0).map((_, index) => <MovieCard key={index}/>)
                    : recentActivity.map(movie =>
                        <Link to={"/movie/"+movie.id} key={movie.id}>
                            <MovieCard movie={movie} key={movie.id}/>
                        </Link>
                    )
                }
            </div>

        </div>
    )
}
export default RecentActivity;