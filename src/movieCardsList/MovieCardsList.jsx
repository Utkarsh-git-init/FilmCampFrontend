import MovieCard from "../movieCard/MovieCard.jsx";
import './movieCardsList.css'
import {useState} from "react";
import {Link} from "react-router-dom";

function MovieCardsList({sectionName,movies}) {
    const [startIndex, setStartIndex] = useState(0)
    function handlePrevButton(){
        if(startIndex > 1) {
            setStartIndex(startIndex - 4)
        }
    }
    function handleNextButton(){
        if(startIndex < 12) {
            setStartIndex(startIndex + 4)
        }
    }
    const pages=[0,4,8,12]
    function handlePageIndicator(){
        return pages.map(index =>
            <div key={index} className={"pageIndicator "+(startIndex===index?"active":"")}></div>)
    }
    return(
        <>
            <div className={"movie-cards-list"}>
                <div className={"movie-cards-list-header"}>
                    <label>{sectionName}</label>
                    <div className={"prev-next-buttons"}>
                        <button onClick={handlePrevButton}>{"<"}</button>
                        <div className={"pageIndicatorContainer"}>
                            {handlePageIndicator()}
                        </div>
                        <button onClick={handleNextButton}>{">"}</button>
                    </div>
                </div>
                <hr/>
                <div className={"movie-cards-list-container"}>
                    {movies.length === 0 ?
                        Array(4).fill(0).map((_, index) => <MovieCard key={index}/>)
                        : movies.slice(startIndex,startIndex+4).map(movie =>
                            <Link to={"/movie/"+movie.id} key={movie.id}>
                                <MovieCard movie={movie} key={movie.id}/>
                            </Link>
                        )
                    }
                </div>
            </div>

        </>
    )
}
export default MovieCardsList;