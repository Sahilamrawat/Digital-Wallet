import React from "react";
import hero from "../assets/hero.svg";
function Hero() {
  return (
    <div className="  flex  items-center gap-5 border-b p-2 py-5">
      <div className="h-[400px]">
        <img src={hero} className="h-full" alt="hero" />
      </div>

      <div className="m-auto">
        <h1 className="font-bold text-[50px] text-[#2E5077]">Easy pay Easy life!</h1>
      </div>
    </div>
  );
}

export default Hero;
