import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { GiTv } from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import { IoWaterOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { BiCameraMovie } from "react-icons/bi";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { IoTrainOutline } from "react-icons/io5";
import { FaTrainTram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import { Card } from "@mui/material";
function FeaturesSection() {
  const navigate = useNavigate();
  return (
    <>
    <div className="bg-[#4DA1A9] p-5 flex flex-col items-center">
      <h1 className="text-[40px] text-white ">Recharge & Pay Bills</h1>

      <div className="flex  pb-8 mt-[40px] ">
        <div className="cards w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  " onClick={() => navigate('/recharge?activeIndex=0')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <FaMobileAlt className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Recharge <br />
            Prepaid <br />
            Mobile
          </span>
        </div>



        <div className="cards w-[150px] flex flex-col  justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  " onClick={() => navigate('/recharge?activeIndex=1')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <FaRegLightbulb className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Pay <br />
            Electricity <br />
            Bill
          </span>
        </div>


        <div className="cards w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  "onClick={() => navigate('/recharge?activeIndex=2')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <GiTv className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Recharge <br />
            TV <br />
            
          </span>
        </div>


        <div className="cards w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  "onClick={() => navigate('/recharge?activeIndex=3')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <IoWaterOutline className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Pay <br />
            Water <br />
            Bill
            
          </span>
        </div>


        <div className="cards w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  " onClick={() => navigate('/recharge?activeIndex=4')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <MdOutlineSchool className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Pay <br />
            Education <br />
            Fee
          </span>
        </div>


        <div className="cards w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-white  " onClick={() => navigate('/recharge?activeIndex=5')}>
          <div className="bg-white w-20 flex justify-center items-center h-20  rounded-full">
            <FaArrowRight className="text-[40px] text-[#4DA1A9]" />
          </div>

          <span className="text-[20px]">
            Others <br />
            
          </span>
        </div>
       

        
      </div>
      
      
    </div>
    <div className="bg-[#F6F4F0] p-8  flex flex-col items-center">
    <h1 className="text-[40px] ">Travel & Entertainment</h1>

    <div className="flex pb-8  mt-[40px] ">
      <div className="cards-white w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black  " onClick={() => navigate('/travel?activeIndex=0')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          < BiCameraMovie className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]" >
          Movie <br />
          Tickets 
        </span>
      </div>



      <div className="cards-white  w-[150px] flex flex-col  justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black  " onClick={() => navigate('/travel?activeIndex=1')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          <PiAirplaneTakeoffLight className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]">
          Flight <br />
          Tickets
        </span>
      </div>


      <div className="cards-white  w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black  " onClick={() => navigate('/travel?activeIndex=2')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          <FaBus className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]">
          Bus <br />
          TIckets
          
        </span>
      </div>


      <div className="cards-white  w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black " onClick={() => navigate('/travel?activeIndex=3')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          <IoTrainOutline className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]">
          Train <br />
          Tickets
          
        </span>
      </div>


      <div className="cards-white  w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black  " onClick={() => navigate('/travel?activeIndex=4')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          <FaTrainTram className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]">
          Metro <br />
          Tickets
        </span>
      </div>


      <div className="cards-white  w-[150px] flex flex-col justify-centre items-center gap-1 py-5  px-5 rounded-[10px] text-black  " onClick={() => navigate('/travel?activeIndex=5')}>
        <div className="bg-[#4DA1A9] w-20 flex justify-center items-center h-20  rounded-full">
          <FaArrowRight className="text-[40px] text-white" />
        </div>

        <span className="text-[20px]">
          Others <br />
          
        </span>
      </div>
     

      
    </div>
    
    
  </div>
  </>
  );
}

export default FeaturesSection;
