import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './searchPage.css'
import noImageAvailable from "/src/assets/no-image-available.jpg";

function SearchPage() {
    const {query}=useParams();
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const [movies, setMovies] = useState([]);
    const [response, setResponse] = useState(null);
    const [error,setError] = useState(false);
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState("1");
    useEffect(() => {
        fetch(baseUrl+"/movie/search/"+query+"/"+page, {
            method: "GET",
            headers: {
                'accept': 'application/json'
            }
        }).then(res => {
            if(res.status === 200) {
                return res.json();
            }else
                setError(true);
        })
            .then(data=>{
                setResponse(data);
                setMovies(data.results);
            })
    }, [baseUrl, page, query]);
    function handleReleaseDate(release_date){
        if (!release_date) return "Release date unknown";
        return new Date(release_date)
            .toLocaleDateString(
                'en-US',
                {year:'numeric',
                    month:'long',
                    day:'numeric'})
    }
    function handlePageChange(e) {
        if(e.key !== 'Enter') return;
        const value = Number(e.target.value);
        setPage(
            Math.min(
                Math.max(value, 1),
                response.total_pages
            )
        );
        setPageInput("" +
            Math.min(
                Math.max(value, 1),
                response.total_pages
            )
        )
    }
    return (
        <>
            <div>
                {
                    movies.length > 0 ?
                        movies.map(movie =>
                            <div key={movie.id} className={"movieCardInSearchPage"}>
                                <Link to={"/movie/"+movie.id} className={"posterLink"}>
                                    <img src={movie.poster_path?movie.poster_path:noImageAvailable} alt={movie.title}/>
                                </Link>
                                <div className={"details"}>
                                    <Link to={"/movie/"+movie.id}>
                                        <p>{movie.title}</p>
                                    </Link>
                                    <p>{handleReleaseDate(movie.release_date)}</p>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>)
                        :
                        <div className={"loader-container"}>
                            {error?
                                <div>Connection timed out. [Reload Page]</div>
                                :
                                <div className="loader"></div>
                            }
                        </div>
                }
                <div>
                    {
                        response &&
                        <div className={"pagination"}>
                            <input type={"number"}
                                   min={1}
                                   max={response.total_pages}
                                   value={pageInput}
                                   onKeyDown={handlePageChange}
                                   onChange={(e)=>setPageInput(e.target.value)}
                            />
                            <p>Total Pages: {response.total_pages}</p>
                            <p>Total Results: {response.total_results}</p>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}
export default SearchPage;