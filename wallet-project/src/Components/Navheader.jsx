import React, {  useState } from 'react';
import './Styles.css';

import logo from "../assets/logo.svg"
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
const ProfileDropDown = ({ isOpen }) => {
  const navigate = useNavigate();
  return (
    <div className={`profile-dropdown ${isOpen ? 'block' : 'hidden'} w-[max] bg-white text-[#213555] absolute right--1 top-12 rounded-lg shadow-lg`}>
      <ul className=" py-2 px-5 flex flex-col items-center">
        <li onClick={()=> navigate('/wallet')}>Wallet</li>
        <hr />
        <li>Profile</li>
        <hr />
        
        <li >Settings</li>
        <hr />
        <li onClick={()=> navigate('/login')}>Logout</li>

      </ul>
    </div>
  );
};

const ServicesDropDown = ({ isOpen }) => {
  const navigate = useNavigate();
  return (
    <div className={`profile-dropdown ${isOpen ? 'block' : 'hidden'} w-[max] bg-white text-[#213555] absolute right--1 top-12 rounded-lg shadow-lg`}>
      <ul className="py-2 flex flex-col items-center">
        <li>Send Money</li>
        <hr />
        <li >Approve To Pay</li>
        <hr />
        <li >Recharge & Pay</li>
        <hr />
        <li>Travel & Entertainment</li>
        <hr />

      </ul>
    </div>
  );
};

function Navheader() {
  const [profile_dropdownOpen, setProfileDropdownOpen] = useState(false);
  const [services_dropdownOpen, setServicesDropdownOpen] = useState(false);

  const profile_toggleDropdown = () => {
    setProfileDropdownOpen((prev) => !prev); // Toggle profile dropdown
    setServicesDropdownOpen(false); // Close services dropdown
  };

  const services_toggleDropdown = () => {
    setServicesDropdownOpen((prev) => !prev); // Toggle services dropdown
    setProfileDropdownOpen(false); // Close profile dropdown
  };
  const navigate = useNavigate();
  // Empty dependency
  return (
    <nav id='nav-bar' className='nav-section  flex justify-between items-center p-2 px-5 text-[18px] bg-[#F6F4F0] text-[#2E5077]'>
      <div className='logo-header flex items-center gap-2'>
        <img src={logo} onClick={() =>navigate('/')} alt="" className="cursor-pointer h-10 w-10" />
        <p className='font-bold '>Digital Wallet</p>
      </div>
      <div className='nav-links relative'>
        <ul className="link-item flex gap-6 font-semibold">
          <li className="cursor-pointer hover:scale-105 transition-transform duration-100" onClick={() => navigate('/home')}>Home</li>
          <li className="relative cursor-pointer hover:scale-105 transition-transform duration-100" onClick={profile_toggleDropdown}>
            Services
            <ServicesDropDown isOpen={profile_dropdownOpen}/>
          </li>
          
          <li className="relative cursor-pointer hover:scale-105 transition-transform duration-100" onClick={services_toggleDropdown}>
            My Account
            <ProfileDropDown isOpen={services_dropdownOpen} />
          </li>
          <li className="cursor-pointer hover:scale-105 transition-transform duration-100">About</li>
        </ul>
      </div>
      <div className='signup-btn cursor-pointer flex items-center gap-1 bg-[#4DA1A9] px-2 py-1 rounded-[5px]' onClick={()=>navigate('/login')}>
        <button className='font-semibold text-white' >Login</button>
        <LoginIcon  className=' text-white'/>
      </div>
    </nav>
  );
}

export default Navheader;
