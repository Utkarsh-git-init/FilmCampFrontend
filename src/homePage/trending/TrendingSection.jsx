import {useEffect, useState} from "react";
import MovieCard from "../movieCard/MovieCard.jsx";
import './trendingSection.css'
import {Link} from "react-router-dom";

function TrendingSection({sectionName}){
    const [movies, setMovies] =useState([])
    const [page, setPage] = useState(0);
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/"+sectionName,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    },[])
    function handlePrevButton(){
        if(page > 1) {
            setPage(page - 4)
        }
    }
    function handleNextButton(){
        if(page < 12) {
            setPage(page + 4)
        }
    }
    const pages=[0,4,8,12]
    function handlePageIndicator(){
        return pages.map(index =>
            <div key={index} className={"pageIndicator "+(page===index?"active":"")}></div>)
    }
    return(
        <>
            <div className={"trendingSectionHeader"}>
                {sectionName === "top_rated" && <label>Top Rated</label>}
                {sectionName === "trending" && <label>Trending</label>}
                <div className={"trendingSectionPrevNextButtons"}>
                    <button onClick={handlePrevButton}>{"<"}</button>
                    <div className={"pageIndicatorContainer"}>
                        {handlePageIndicator()}
                    </div>
                    <button onClick={handleNextButton}>{">"}</button>
                </div>
            </div>
            <div className={"trendingSectionContainer"}>
                {movies.length > 0 ?
                    movies.slice(page, page + 4).map(
                        movie => <div key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <MovieCard img={movie.poster_path}/>
                            </Link>
                        </div>
                    )
                    : Array(4).fill(0).map((_, i) => <div key={i} className={"emptyPoster"}></div>)
                }
            </div>
        </>
    )
}
export default TrendingSection;