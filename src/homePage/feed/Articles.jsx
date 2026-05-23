import {useEffect, useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
import './articles.css'

function Articles() {
    const [slashFilmFeed, setSlashFilmFeed] = useState([]);
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/feed/slashfilm",{
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setSlashFilmFeed(data)
            })
    }, []);
    if(slashFilmFeed.length === 0) return (
        <div className={"loader-container"}>
            <div className="loader"></div>
        </div>
    )
    return (
        <div className={"feed"}>
            {
                slashFilmFeed.map(article =><ArticleCard article={article}/>)
            }
        </div>
    )
}
export default Articles;