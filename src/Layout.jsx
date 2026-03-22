import { Link, Outlet } from "react-router";
import Navbar from "./components/Navbar";

function Layout() {
    return (
        <div>
            <div>
                 <Navbar />
            </div>
           
            <header>
                
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;