import TrendingSection from "./trending/TrendingSection.jsx";
import './homePage.css'
import TopRated from "./TopRated/TopRated.jsx";
import PopularOnFilmCamp from "./popularOnFilmCamp/PopularOnFilmCamp.jsx";
import {useState} from "react";
import Feed from "./feed/Feed.jsx";

function HomePage() {
    const [isFeedOpen, setIsFeedOpen] = useState(false)
    return(
        <>
            <div className={"homepageContainer"}>
                <div>
                    <div className={"homePageHeader"}>
                        <button onClick={()=>setIsFeedOpen(false)}>Home</button>
                        <button onClick={()=>setIsFeedOpen(true)}>Feed</button>
                    </div>
                    {isFeedOpen?
                        <Feed/>
                        :
                        <>
                            <PopularOnFilmCamp/>
                            <TrendingSection />
                            <TopRated/>
                        </>

                    }
                </div>
            </div>
        </>
    )
}
export default HomePage;