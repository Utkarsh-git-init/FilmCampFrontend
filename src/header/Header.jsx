import './header.css'
import {Link, useNavigate} from "react-router-dom";
import { IoPersonOutline, IoSearch, IoClose } from "react-icons/io5";
import {useRef, useState} from "react";

function Header() {
    const [searchBox, setSearchBox] = useState("")
    const [searchButton, setSearchButton] = useState(true)
    const handleSearchBoxChange = (e) => {setSearchBox(e.target.value)}
    const navigate=useNavigate();
    function handleSearchButtonClick(e) {
        if(e.key === "Enter") {
            navigate("/search/"+searchBox)
        }
    }
    const inputRef=useRef(null);
    function handleSearchCLick() {
        setSearchButton(false);
        setTimeout(()=>{
            inputRef.current?.focus();
        })
    }
    return(
        <>
            <div className={"header"}>
                <Link to={"/"} className={"headerLeft"}>
                    <p id={"titleLogo"}>FILMCAMP</p>
                </Link>
                <div className={"headerRight"}>
                    <div className={`search-container ${searchButton?"close":"open"}`}>
                        <IoSearch  size={33} onClick={handleSearchCLick} className={"search-icon"}/>
                        <div className={"search-input-wrapper"}>
                            <input type="text"
                                   placeholder="Search"
                                   ref={inputRef}
                                   value={searchBox}
                                   onChange={handleSearchBoxChange}
                                   onKeyDown={handleSearchButtonClick}
                            />
                            <IoClose size={33} onClick={()=>setSearchButton(true)} className={"close-icon"}/>
                        </div>
                    </div>
                    <div className={"profile-icon-container"}>
                        <Link to={"/profile"}>
                            <IoPersonOutline size={30} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;