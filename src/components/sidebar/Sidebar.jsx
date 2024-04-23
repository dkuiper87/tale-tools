import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

function Sidebar() {
    const {logout} = useAuth();

    return (
        <ul>
            <li>
                <NavLink
                    to="/">
                    Home
                </NavLink>

            </li>
            <li>
                <NavLink
                    to="/account">
                    Account
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/encounters">
                    Encounters
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/rules">
                    Rules
                </NavLink>
            </li>
            <li>
                <button onClick={logout}>Logout</button>
            </li>
        </ul>
    )
}

export default Sidebar