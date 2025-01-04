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

import MyAccount from './Components/MyAccount'
import SendMoney from './Components/SendMoney'
import Recharge from './Components/Recharge'
import Travel from './Components/Travel'
import Footer from './Components/Footer'
import AboutPage from './Components/AboutPage'
import WalletPerson from '../src/assets/WalletPerson.svg'
function App() {

  

  return (
    <div className='font-archivo'>
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Home/>}/>
        
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/wallet" element={<MyAccount/>}/>
          <Route path="/send-money" element={<SendMoney/>}/>
          <Route path="/recharge" element={<Recharge/>}/>
          <Route path="/travel" element={<Travel/>}/>
          <Route path='/about' element={<AboutPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function Home(){
  return(
    <div className="main-container  w-[100vw] h-[100vh] m-0 p-0 overflow-x-hidden flex flex-col">
      <Navheader />
      <Hero />
      <FeaturesSection />
        <div className="  flex  items-center gap-5 border-b p-2 py-5">
            
      
          <div className="m-auto">
            <h1 className="font-bold text-[50px] text-[#2E5077]">"Your wallet, your world!"</h1>
            <p>
            Your wallet is the key to unlocking endless possibilities empower your world with every choice!
            </p>
          </div>
          <div className="h-[400px]">
            <img src={WalletPerson} className="w-[400px] h-[400px]" alt="hero" />
          </div>
        </div>
      <Footer />
    </div>

  )
}
export default App
