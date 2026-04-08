import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Home from './Home'
import Navbar from "./Navbar";
import Profile from './Profile';
import Feed from './Feed';
import Post from './createPost';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Post />
  </StrictMode>,
)
