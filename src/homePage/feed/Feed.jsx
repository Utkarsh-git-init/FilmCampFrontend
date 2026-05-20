import {useEffect, useState} from "react";
import ArticleCard from "./ArticleCard.jsx";
import './feed.css'

function Feed() {
    const [colliderFeed, setColliderFeed] = useState([]);
    useEffect(() => {
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        fetch(baseUrl+"/feed/collider",{
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setColliderFeed(data)
            })
    }, []);
    if(colliderFeed.length === 0) return (
        <p>Loading...</p>
    )
    return (
        <div className={"feed"}>
            {
                colliderFeed.map(article =><ArticleCard article={article}/>)
            }
        </div>
    )
}
export default Feed;