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
            <div className={"recent-activity-header"}>
                <label className={"recent-activity-title"}>Recent Activity</label>
            </div>
            <div className={"recent-activity-movie-card-section"}>
                {recentActivity.length === 0 ?
                    Array(4).fill(0).map((_, index) => <MovieCard key={index}/>)
                    : recentActivity.map(movie =>
                        <Link to={"/movie/"+movie.id} key={movie.id}>
                            <MovieCard movie={movie} key={movie.id}/>
                        </Link>
                    )
                }
                {recentActivity.length === 1 && Array(3).fill(0).map((_, index) => <MovieCard key={index}/>)}
                {recentActivity.length === 2 && Array(2).fill(0).map((_, index) => <MovieCard key={index}/>)}
                {recentActivity.length === 3 && Array(1).fill(0).map((_, index) => <MovieCard key={index}/>)}
            </div>

        </div>
    )
}
export default RecentActivity;