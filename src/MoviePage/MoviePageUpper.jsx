import './moviePageUpper.css'

function MoviePageUpper({movie}){
    const releasedate=function (){
        const rd=movie.release_date;
        return new Date(rd).toLocaleDateString('en-US',{
            year:'numeric',
            month:'long',
            day:'numeric'}).replace(/\//g, '');
    }
    return (
        <>
            <div className={"moviePageUpper"}>
                <img id={"backdrop"} src={movie.backdrop_path}/>
                <div className={"detailsAndPoster"}>
                    <img src={movie.poster_path}/>
                    <div className={"details"}>
                        <div className={"titleAndReleaseDate"}>
                            <h2>{movie.title}</h2>
                            <p>{releasedate()}</p>
                        </div>
                        <p id={"tagline"}>{movie.tagline}</p>
                        <p id={"overview"}>{movie.overview}</p>
                    </div>
                </div>
            </div>

        </>
    )
}
export default MoviePageUpper