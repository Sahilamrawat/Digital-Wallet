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
    </div>

  )
}
export default App
