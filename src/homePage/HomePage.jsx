import TrendingSection from "./trending/TrendingSection.jsx";
import './homePage.css'
import TopRated from "./TopRated/TopRated.jsx";

function HomePage() {
    return(
        <>
            <div className={"homepageContainer"}>
                <div>
                    <TrendingSection />
                    <TopRated/>
                </div>
            </div>
        </>
    )
}
export default HomePage;