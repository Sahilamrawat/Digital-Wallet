import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navheader from './Components/Navheader'
import Hero from './Components/Hero'
import FeaturesSection from './Components/FeaturesSection'

function App() {

  return (
    <div className="w-[100vw] h-[100vh] m-0 p-0 overflow-x-hidden flex flex-col" >
      <Navheader/>
      <Hero/>
      <FeaturesSection/>
    </div>
  )
}

export default App
