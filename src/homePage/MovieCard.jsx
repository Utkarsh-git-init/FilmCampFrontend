import './movieCard.css'

function MovieCard({img,title}) {
    return (
        <>
            <div className="movieCard">
                <img src={img}
                     alt={title}
                     loading={"lazy"}
                     onLoad={(e)=>e.target.classList.add("loaded")}
                />
            </div>
        </>
    )
}
export default MovieCard;