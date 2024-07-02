import './App.css'

import { AuthProvider } from "./context/AuthContext.jsx";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/registration/Registration.jsx";
import Login from "./pages/login/Login.jsx";
import Account from "./pages/account/Account.jsx";
import Rules from "./pages/rules/Rules.jsx";
import Encounters from "./pages/encounters/Encounters.jsx";
import DiceRoller from "./components/diceRoller/DiceRoller.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import {DiceProvider} from "./context/DiceContext.jsx";

function App() {

  return (
    <>
        <AuthProvider>
            <DiceProvider>
                <Sidebar/>
                <DiceRoller/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/rules" element={<Rules/>}/>
                    <Route path="/encounters" element={<Encounters/>}/>
                </Routes>
            </DiceProvider>
        </AuthProvider>
    </>
  )
}

export default App
