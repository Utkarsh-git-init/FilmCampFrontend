import './header.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


function Header() {
    const [searchBox, setSearchBox] = useState("")
    const handleSearchBoxChange = (e) => {setSearchBox(e.target.value)}
    const navigate=useNavigate();
    function handleSearchButtonClick(e) {
        if(e.key === "Enter") {
            navigate("/search/"+searchBox)
        }
    }
    return(
        <>
            <div className={"header"}>
                <Link to={"/"} className={"headerLeft"}>
                    <h1 id={"titleLogo"}>FILMCAMP</h1>
                </Link>
                <div className={"headerRight"}>
                    <input type="text"
                           placeholder="Search"
                           value={searchBox}
                           onChange={handleSearchBoxChange}
                           onKeyDown={handleSearchButtonClick}/>
                </div>
            </div>
        </>
    )
}
export default Header;