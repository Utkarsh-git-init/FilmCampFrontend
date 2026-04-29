import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MovieCard from "../homePage/MovieCard.jsx";
import './searchPage.css'

function SearchPage() {
    const {query}=useParams();
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch(baseUrl+"/movie/search/"+query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(setMovies)
    }, [baseUrl, query]);
    function handleReleaseDate(release_date){
        if (!release_date) return "Release date unknown";
        return new Date(release_date)
            .toLocaleDateString(
                'en-US',
                {year:'numeric',
                    month:'long',
                    day:'numeric'})
    }
    return (
        <>
            <div>
                {
                    movies.length > 0 ?
                        movies.map(movie =>
                            <div key={movie.id} className={"movieCardInSearchPage"}>
                                <Link to={"/movie/"+movie.id} className={"posterLink"}>
                                    <img src={movie.poster_path}/>
                                </Link>
                                <div className={"details"}>
                                    <Link to={"/movie/"+movie.id}>
                                        <p>{movie.title}</p>
                                    </Link>
                                    <p>{handleReleaseDate(movie.release_date)}</p>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>)
                        :<p>Loading</p>
                }
            </div>
        </>
    )
}
export default SearchPage;