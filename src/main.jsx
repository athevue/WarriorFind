import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Home from './Home'
import Navbar from "./Navbar";
import Profile from './Profile';
import SignIn from './Signin';
import SignUp from './Signup'; 
import { BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
