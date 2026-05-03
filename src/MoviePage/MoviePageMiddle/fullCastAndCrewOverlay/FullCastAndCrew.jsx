import './fullCNC.css'

function FullCastAndCrew({cast, crew, closeOverlay}) {
    return (
        <>
            <div className={"overlay-backdrop"}>
                <div className={"overlay-content"}>
                    <div className={"overlay-header"}>
                        <h2>Full Cast & Crew</h2>
                        <button onClick={closeOverlay}>Close</button>
                    </div>
                    <div className={"overlay-body"}>
                        <div className={"overlay-cast-n-crew"}>
                            <label>Cast</label>
                            {cast.map(castMember =>
                                <div key={castMember.id} className={"overlay-cast-n-crew-member"}>
                                    <img src={castMember.profile_path}/>

                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                        <p>{castMember.name}</p>
                                        <p>{castMember.character}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={"overlay-cast-n-crew"}>
                            <label>Crew</label>
                            {crew.map(crewMember =>
                                <div key={crewMember.id} className={"overlay-cast-n-crew-member"}>
                                    <img src={crewMember.profile_path}/>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                        <p>{crewMember.name}</p>
                                        <p>{crewMember.known_for_department}</p>
                                        <p>{crewMember.job}</p>
                                    </div>

                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default FullCastAndCrew;
