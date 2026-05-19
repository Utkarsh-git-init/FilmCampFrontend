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
    useEffect(() => {
        const textarea=textareaRef.current;
        if(textarea){
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            // --- FIX CARET JUMPING AT THE BOTTOM ---
            // Get the bounding box of the textarea relative to the viewport
            const rect = textarea.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Define a buffer zone (e.g., 60px from the bottom of the screen)
            const safetyBuffer = 60;

            // If the bottom of the textarea is within or below the buffer zone
            if(text!==""){
                if (rect.bottom > viewportHeight - safetyBuffer) {
                    // Smoothly push the window scroll position down to keep a clear gap
                    window.scrollBy({
                        top: rect.bottom - (viewportHeight - safetyBuffer),
                        behavior: 'instant' // 'instant' prevents jarring UI lag during fast typing
                    });
                }
            }
        }
    },[text])

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
                movie_id:movie.id,
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
                        <ReviewCard review={review}/>
                        <hr/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ReviewSection;