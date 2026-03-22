import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="p-2 m-4 flex justify-center gap-24">
            <Link to="/collection">Collection</Link>
            <Link to="/aboutme">About Me</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    )
}

export default Navbar