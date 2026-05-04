import './movieCard.css'

function MovieCard({movie}) {
    return (
        <>
            <div className={"movieCardContainer"}>
                {movie?
                    <div className="movieCard">
                        <img src={movie.poster_path}
                             alt={movie.title}
                             loading={"lazy"}
                             onLoad={(e)=>e.target.classList.add("loaded")}
                        />
                    </div>
                :
                    <div className="movieCard"></div>
                }

            </div>

        </>
    )
}
export default MovieCard;