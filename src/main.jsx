import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Home from './Home'
import Navbar from "./Navbar";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Home />
  </StrictMode>,
)
