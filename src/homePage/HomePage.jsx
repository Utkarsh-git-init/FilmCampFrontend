import TrendingSection from "./trending/TrendingSection.jsx";
import './homePage.css'
import TopRated from "./TopRated/TopRated.jsx";
import PopularOnFilmCamp from "./popularOnFilmCamp/PopularOnFilmCamp.jsx";

function HomePage() {
    return(
        <>
            <div className={"homepageContainer"}>
                <div>
                    <PopularOnFilmCamp/>
                    <TrendingSection />
                    <TopRated/>
                </div>
            </div>
        </>
    )
}
export default HomePage;