import {Link} from "react-router-dom";

export function Navbar() {
    return(
        <>
            <h1>
                <Link to={'/products/home'}>Home</Link>
                <Link to={'/products/add'}>Add</Link>
            </h1>
        </>
    )
}