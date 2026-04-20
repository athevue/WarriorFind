import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Navbar from "./Navbar";
import Profile from './Profile';
import SignIn from './Signin';
import SignUp from './Signup'; 
import Browse from './Browse';
import Feed from './Feed';
import Post from './createPost';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create-post" element={<Post />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
