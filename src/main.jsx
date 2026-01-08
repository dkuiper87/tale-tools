import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DiceProvider } from "./context/DiceContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <AuthProvider>
              <DiceProvider>
                  <App />
              </DiceProvider>
          </AuthProvider>
      </Router>
  </React.StrictMode>,
)
