import {useEffect, useState} from "react";
import './trendingSection.css'
import MovieCardsList from "../../movieCardsList/MovieCardsList.jsx";

function TrendingSection(){
    const [movies, setMovies] =useState([])
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/trending",{
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    },[baseUrl])
    return(
        <>
            <div>
                <MovieCardsList sectionName={"Trending Today"} movies={movies}/>
            </div>
        </>
    )
}
export default TrendingSection;