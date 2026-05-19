import {useContext, useEffect, useRef, useState} from "react";
import './reviewSection.css'
import ReviewCard from "./ReviewCard.jsx";
import {UserContext} from "../../layout/UserContext.jsx";

function ReviewSection({movie}){
    const [reviews, setReviews] = useState([])
    const baseUrl=import.meta.env.VITE_API_BASE_URL;
    const user=useContext(UserContext);
    useEffect(() => {
        fetch(baseUrl+"/movie/"+movie.id+"/reviews",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    },[baseUrl, movie.id])
    const [text, setText] = useState("")
    const textareaRef = useRef(null);
    const prevHeightRef = useRef(0);
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // 1. Capture the height before resetting it
            const oldHeight = textarea.offsetHeight;

            textarea.style.height = "auto";
            const newHeight = textarea.scrollHeight;
            textarea.style.height = newHeight + "px";

            if (text !== "") {
                const rect = textarea.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const safetyBuffer = 60;

                // 2. DETECT SHRINKING: If the new height is smaller than the old height
                if (newHeight < oldHeight && prevHeightRef.current > 0) {
                    const heightDifference = oldHeight - newHeight;

                    // Scroll down by the exact amount it shrank to keep the cursor
                    // anchored perfectly in place instead of jumping to the top
                    window.scrollBy({
                        top: -heightDifference,
                        behavior: 'instant'
                    });
                }
                // 3. DETECT GROWING: Falling into the bottom safety buffer
                else if (rect.bottom > viewportHeight - safetyBuffer) {
                    window.scrollBy({
                        top: rect.bottom - (viewportHeight - safetyBuffer),
                        behavior: 'instant'
                    });
                }
            }

            // Save the current height for the next keystroke/render
            prevHeightRef.current = newHeight;
        }
    }, [text]);

    function handleReviewPost(){
        if(text==="")
            return;
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
                content:text
            })
        })
        setText("")
        const review={
            id:Date.now(),
            movie_id:movie.id,
            content:text,
            username:user.username,
            user_id:user.userId,
            created_at:new Date().toISOString(),
            replies:[]
        }
        setReviews(prev=>{
            return [review,...prev]
        })
    }

    return(
        <div className={"review-section"}>
            <label>User Reviews</label>
            <div className={"post-review-section"}>
                <textarea ref={textareaRef}
                          placeholder={"Add a review..."}
                          value={text}
                          onChange={(e)=>setText(e.target.value)}
                />
                <div className={"post-review-section-buttons"}>
                    <button onClick={()=>setText("")}>Cancel</button>
                    <button onClick={handleReviewPost}>Submit</button>
                </div>
            </div>
            <div className={"reviews-display-section"}>
                {reviews.map(review =>
                    <div key={review.id}>
                        <ReviewCard review={review} movie={movie}/>
                        <hr/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ReviewSection;