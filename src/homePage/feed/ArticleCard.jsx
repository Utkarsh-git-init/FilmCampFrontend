import './articleCard.css'

function ArticleCard({article}) {
    return (
        <div className={"articleCard"}>
            <img src={article.imageUrl}/>
            <div className={"articleCardContent"}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
            </div>

        </div>
    )
}
export default ArticleCard;