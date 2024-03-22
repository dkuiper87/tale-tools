import './App.css'

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/registration/Registration.jsx";
import Login from "./pages/login/Login.jsx";
import Account from "./pages/account/Account.jsx";
import Rules from "./pages/rules/Rules.jsx";
import Encounters from "./pages/encounters/Encounters.jsx";

import Sidebar from "./components/sidebar/Sidebar.jsx";

function App() {
  return (
    <>
        <Sidebar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/rules" element={<Rules/>}/>
            <Route path="/encounters" element={<Encounters/>}/>
        </Routes>
    </>
  )
}

export default App
