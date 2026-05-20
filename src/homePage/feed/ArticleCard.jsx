import './articleCard.css'

function ArticleCard({article}) {
    return (
        <div className={"articleCard"}>
            <div className={"articleCardImage"}>
                <a href={article.link} target={"_blank"} rel={"noreferrer"}>
                    <img src={article.imageUrl}/>
                </a>
            </div>
            <div className={"articleCardContent"}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
            </div>

        </div>
    )
}
export default ArticleCard;