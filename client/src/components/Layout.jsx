import {Outlet} from "react-router-dom";
import Header from "./Head";
import Footer from "./Foot";

export default function Layout(){
    return (
        <div>
            <Header />
                <Outlet />
            <Footer />
        </div>
        
    )
}