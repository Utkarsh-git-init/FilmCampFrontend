import {useEffect, useState} from "react";
import MovieCardsList from "../../movieCardsList/MovieCardsList.jsx";

function PopularOnFilmCamp(){
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch(baseUrl+"/movie/popular_on_film_camp",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        }).then(data => data.json())
            .then(data => {
                setMovies(data)
            })
    }, [baseUrl]);

    return(
        <MovieCardsList sectionName={"Popular on Film Camp"} movies={movies}/>
    )
}
export default PopularOnFilmCamp;