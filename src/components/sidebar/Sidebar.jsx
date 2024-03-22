import {NavLink} from "react-router-dom";

function Sidebar() {
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
        </ul>
    )
}

export default Sidebar