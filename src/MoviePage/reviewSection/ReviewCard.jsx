import {IoPersonOutline} from "react-icons/io5";
import './reviewCard.css'
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../layout/UserContext.jsx";

function ReviewCard({review}) {
    const [replying, setReplying] = useState(false)
    const [replyText, setReplyText] = useState("")
    const [replies,setReplies]=useState(review.replies)
    const user=useContext(UserContext)
    const textarea=useRef(null);
    useEffect(() => {
        if(replying&&textarea.current){
            textarea.current.focus();
        }
    }, [replying]);
    function handleDateTime(date){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }
    function handleReplySubmit(){
        const baseUrl=import.meta.env.VITE_API_BASE_URL;
        const reply={
            id:Date.now(),
            movie_id:review.movie_id,
            parent_id:review.id,
            content:replyText,
            username:user.username,
            user_id:user.userId,
            created_at:new Date().toISOString(),
            replies:[]
        }
        fetch(baseUrl+"/movie/add_review",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({
                movie_id:review.movie_id,
                parent_id:review.id,
                content:replyText
            })
        })
        setReplyText("")
        setReplying(false)
        setReplies(prev=>{
            return [reply,...prev]
        })
    }
    return (
        <div className={"review"}>
            <div className={"review-header"}>
                <IoPersonOutline/>
                <p>{review.username}</p>
                <p>{handleDateTime(review.created_at)}</p>
            </div>
            <div className={"review-body"+(replies.length!==0?"-with-replies":"")}>
                <div className={"content-wrapper"}>
                    <p id={"content"}>{review.content}</p>
                    <button onClick={()=>setReplying(!replying)}
                            style={{background:"none",border:"none",cursor:"pointer",marginBottom:"0.3rem"}}
                    >Reply</button>
                </div>
                {/*replies*/}
                {
                    replying &&
                    <div className={"reply-box"}>
                        <div className={"post-review-section"}>
                        <textarea placeholder={"Add a reply..."}
                                  ref={textarea}
                                  value={replyText}
                                  onChange={(e)=>setReplyText(e.target.value)}
                        />
                            <div className={"post-review-section-buttons"}>
                                <button onClick={()=>{setReplying(false)}}>Cancel</button>
                                <button onClick={handleReplySubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                }
                <div className={"replies-container"}>
                    {replies.map(reply =>
                        <ReviewCard review={reply} key={reply.id}/>
                    )}
                </div>
            </div>

        </div>
    )
}
export default ReviewCard;