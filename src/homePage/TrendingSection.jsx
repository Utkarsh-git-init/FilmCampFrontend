import {useEffect, useState} from "react";
import MovieCard from "./MovieCard.jsx";
import './trendingSection.css'

function TrendingSection(){
    const [movies, setMovies] =useState([])
    const [page, setPage] = useState(0);
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    useEffect(()=>{
        fetch(baseUrl+"/movie/trending",{
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
        if(page < 16) {
            setPage(page + 4)
        }
    }
    return(
        <>
                <div  className={"trendingSectionContainer"}>
                    {movies.length > 0 ?
                        movies.slice(page,page+4).map(
                            movie => <div key={movie.id}>
                                <MovieCard img={movie.poster_path}/>
                            </div>
                        )
                        :Array(4).fill(0).map((_,i)=><div key={i} className={"emptyPoster"}></div>)
                    }
                </div>
                <div className={"trendingSectionPrevNextButtons"}>
                    <button onClick={handlePrevButton}>{"<"}</button>
                    <button onClick={handleNextButton}>{">"}</button>
                </div>

        </>
    )
}
export default TrendingSection;