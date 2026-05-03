import {useEffect, useState} from "react";
import './moviePageMiddle.css'
import FullCastAndCrew from "./fullCastAndCrewOverlay/FullCastAndCrew.jsx";
function MoviePageMiddle({movie}){
    const [cast, setCast] = useState([])
    const [crew, setCrew] = useState([])
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/movie/"+movie.id+"/credits",{
            headers:{
                'Authorization':localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setCast(data.cast)
            setCrew(data.crew)
        })
    }, [movie.id]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    function CloseOverlay(){
        setIsOverlayOpen(false)
    }
    useEffect(() => {
        if (isOverlayOpen) {
            // Prevent the background from scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scrolling when overlay closes
            document.body.style.overflow = 'unset';
        }

        // Cleanup function in case component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOverlayOpen]);
    return(
        <>
            <div className={"moviePageMiddle"}>
                <label>Cast & Crew</label>
                <div className={"moviePageMiddleCast"}>
                    {cast.slice(0,Math.min(5,cast.length)).map(castMember =>
                        <div key={castMember.id} className={"moviePageMiddleCastMember"}>
                            <p>{castMember.name}</p>
                        </div>
                    )}
                    <div className={"moviePageMiddleCastMember"}>
                        <button className={"fullCastAndCrewButton"} onClick={()=>setIsOverlayOpen(true)}>Full Cast & Crew</button>
                    </div>
                </div>
                {isOverlayOpen && <FullCastAndCrew cast={cast} crew={crew} closeOverlay={CloseOverlay}/>}
                <label>Genres</label>
                <div className={"moviePageMiddleCast"}>
                    {movie.genres?.map(genre =>
                        <div key={genre.id} className={"moviePageMiddleCastMember"}>
                            <p>{genre.name}</p>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
export default MoviePageMiddle;