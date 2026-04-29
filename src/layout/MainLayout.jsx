import Header from "../header/Header.jsx";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}
export default MainLayout;