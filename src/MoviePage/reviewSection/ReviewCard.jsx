import {IoPersonOutline} from "react-icons/io5";
import './reviewCard.css'
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../layout/UserContext.jsx";
import {Link, useNavigate} from "react-router-dom";

function ReviewCard({review, movie}) {
    const [replying, setReplying] = useState(false)
    const [replyText, setReplyText] = useState("")
    const [replies,setReplies]=useState(review.replies)
    const {user:user, authenticated:authenticated}=useContext(UserContext)
    const navigate=useNavigate();
    const textareaRef=useRef(null);
    useEffect(() => {
        if(replying&&textareaRef.current){
            textareaRef.current.focus();
        }
    }, [replying]);
    const prevHeightRef = useRef(0);
    useEffect(() => {
        const textarea = textareaRef.current;
        if(replyText){
            const oldHeight = textarea.offsetHeight;
            textarea.style.height="auto";
            textarea.style.height = textarea.scrollHeight + "px";
            const newHeight = textarea.scrollHeight;
            if(replyText!==""){
                const rect=textarea.getBoundingClientRect();
                const viewportHeight=window.innerHeight;
                const safetyBuffer = 60
                if (newHeight < oldHeight && prevHeightRef.current > 0) {
                    const heightDifference = oldHeight - newHeight;

                    // Scroll down by the exact amount it shrank to keep the cursor
                    // anchored perfectly in place instead of jumping to the top
                    window.scrollBy({
                        top: -heightDifference,
                        behavior: 'instant'
                    });
                }

                if(rect.bottom>viewportHeight-safetyBuffer){
                    window.scrollBy({
                        top:rect.bottom-(viewportHeight-safetyBuffer),
                        behavior: "instant"
                    })
                }
                prevHeightRef.current = newHeight;
            }
        }
    },[replyText])
    function handleDateTime(date){
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }
    function handleReplySubmit(){
        if(replyText==="")
            return
        if(!authenticated) {
            navigate("/login")
            return;
        }
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
                movie:{
                    id:movie.id,
                    title:movie.title,
                    poster_path:movie.poster_path,
                },
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
                <Link to={"/user/"+review.username}>
                    <IoPersonOutline/>
                </Link>
                <Link to={"/user/"+review.username}>
                    <p>{review.username}</p>
                </Link>
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
                                  ref={textareaRef}
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
                        <ReviewCard review={reply} key={reply.id} movie={movie}/>
                    )}
                </div>
            </div>

        </div>
    )
}
export default ReviewCard;