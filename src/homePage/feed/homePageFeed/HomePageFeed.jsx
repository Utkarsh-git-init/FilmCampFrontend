import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './homePageFeed.css'

function HomePageFeed() {
    const [articles , setArticles] = useState([]);
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
                setArticles(data)
            })
    },[])
    return (
        <>
            <div className={"homePageFeed"}>
                <div className={"homePageFeedHeader"}>
                    <label>Articles</label>
                    <Link to={"/articles"}>View All</Link>
                </div>

                {
                    articles.length ===0?
                        <div className="homePageFeedFiller">

                        </div>
                        :
                        <div className={"homePageFeedArticles"}>
                            {articles.slice(0,3).map(article =>
                                <div className={"homePageFeedArticle"}>
                                    <a href={article.link} target={"_blank"} rel={"noreferrer"}>
                                        <img src={article.imageUrl} alt={article.title}/>
                                    </a>
                                    <div className={"homePageFeedArticleContent"}>
                                        <label>{article.title}</label>
                                        <p>{article.description}</p>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                }
            </div>
        </>

    )
}
export default HomePageFeed;