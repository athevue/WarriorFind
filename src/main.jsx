import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Home from './Home'
import Navbar from "./Navbar";
import Post from './createPost';
import Feed from './Feed';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Feed />
  </StrictMode>,
)
