import './movieCard.css'

function MovieCard(props) {
    return (
        <>
            <div className="movieCard">
                <img src={props.img} alt={props.title} />
            </div>
        </>
    )
}
export default MovieCard;