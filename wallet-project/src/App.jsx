import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navheader from './Components/Navheader'
import Hero from './Components/Hero'
import FeaturesSection from './Components/FeaturesSection'
import "./index.css"
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Wallet from './Components/Wallet'
function App() {

  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/wallet" element={<Wallet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function Home(){
  return(
    <div className="main-container  scrollbar-thin scrollbar-thumb-[#2E5077] scrollbar-track-[#ffffff]  w-[100vw] h-[100vh] m-0 p-0 overflow-x-hidden flex flex-col" >
      <Navheader/>
      <Hero/>
      <FeaturesSection/>
    </div>
  )
}
export default App
