import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Sidebar.css";
import LogoNoText from "../../assets/LogoNoText.jsx";
import SidebarExpand from "../../assets/SidebarExpand.jsx";
import HomeIcon from "../../assets/HomeIcon.jsx";
import UserIcon from "../../assets/UserIcon.jsx";
import BookIcon from "../../assets/BookIcon.jsx";
import EncounterIcon from "../../assets/EncounterIcon.jsx";
import SidebarCollapse from "../../assets/SidebarCollapse.jsx";
import LogoutIcon from "../../assets/LogoutIcon.jsx";

function Sidebar() {
    const { user, logout } = useAuth();
    const [expandSidebar, setExpandSidebar] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setExpandSidebar(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            {user && (
                <nav className={expandSidebar ? "nav-menu expanded" : "nav-menu"}>
                    <ul className="sidebar-content">
                        <li className="logo">
                            <LogoNoText
                                logoWidth={expandSidebar ? "50%" : "50%"}
                                logoHeight="auto"
                            />
                        </li>
                        <li>
                            <button onClick={toggleSidebar} className="toggle-button" aria-label="Toggle sidebar">
                                {expandSidebar ? (
                                    <SidebarCollapse iconWidth="20%" iconHeight="auto" />
                                ) : (
                                    <SidebarExpand iconWidth="30%" iconHeight="auto" />
                                )}
                            </button>
                        </li>
                        <li>
                            <NavLink to="/">
                                {expandSidebar ? "Home" : <HomeIcon iconWidth="30%" iconHeight="auto"/>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/account">
                                {expandSidebar ? "Account" : <UserIcon iconWidth="30%" iconHeight="auto"/>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/encounters">
                                {expandSidebar ? "Encounters" : <EncounterIcon iconWidth="30%" iconHeight="auto"/>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/rules">
                                {expandSidebar ? "Rules" : <BookIcon iconWidth="30%" iconHeight="auto"/>}
                            </NavLink>
                        </li>
                        <li className="logout-item">
                            <button onClick={handleLogout} className="logout-button">
                                {expandSidebar ? "Logout" : <LogoutIcon iconWidth="30%" iconHeight="auto"/>}
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Sidebar;
