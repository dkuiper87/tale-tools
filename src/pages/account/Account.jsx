//import axios from "axios";
//import noviUri from "../../constants/novibackend.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
function Account() {
    //const token = localStorage.getItem('token')
    const { user } = useAuth();
    //async function to get user data


    return (
        <>
            {user ? (
                <h1>Welcome, {user.username}!</h1>
            ) : (
                <h1>Welcome to our website! Please log in.</h1>
            )}
        </>
    )
}

export default Account