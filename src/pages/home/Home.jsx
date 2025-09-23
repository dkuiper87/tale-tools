import Logo from "../../assets/Logo.jsx";
import {NavLink} from "react-router-dom";
import './Home.css';
import {useAuth} from "../../context/AuthContext.jsx";
import LogoNoText from "../../assets/LogoNoText.jsx";

function Home() {
    const {user} = useAuth();

    return (
        <div className='home align-center'>
            <Logo
                logoWidth="15em"
                logoHeight="15em"
            />
            {!user && (
                <div className={'flex-col justify-center'}>
                    <NavLink to="/login" className="button">Login</NavLink>
                    <NavLink to="/register" className="button">Register</NavLink>
                </div>
            )}
        </div>
    )
}

export default Home