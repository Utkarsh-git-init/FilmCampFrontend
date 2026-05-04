import TrendingSection from "../trending/TrendingSection.jsx";
import {useEffect, useState} from "react";
import MovieCardsList from "../../movieCardsList/MovieCardsList.jsx";

function TopRated(){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/movie/top_rated",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }, []);
    return(
        <>
            <div>
                <MovieCardsList sectionName={"Top Rated"} movies={movies}/>
            </div>
        </>
    )
}
export default TopRated;