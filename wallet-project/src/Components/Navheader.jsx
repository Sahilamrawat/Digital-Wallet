import React, {  useEffect, useState } from 'react';
import './Styles.css';

import logo from "../assets/logo.svg"
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Default avatar icon

const ServicesDropDown = ({ isOpen }) => {
  const navigate = useNavigate();
  return (
    <div className={`profile-dropdown ${isOpen ? 'block' : 'hidden'} w-[max] bg-white text-[#213555] absolute right--1 top-12 rounded-lg shadow-lg`}>
      <ul className="py-2 flex flex-col items-center">
        <li onClick={()=>navigate('/send-money')}>Send Money</li>
        <hr />
        <li onClick={()=>navigate('/recharge')}>Recharge & Pay Bills</li>
        <hr />
        <li onClick={()=>navigate('/travel')}>Travel & Entertainment</li>
        <hr />

      </ul>
    </div>
  );
};

function Navheader() {
  // let status=false;

  const [services_dropdownOpen, setServicesDropdownOpen] = useState(false);
  //  const[loginStatus setLoginStatus]=useState(false);
  const[loggedInUser,setLoggedInUser]=useState('');

  useEffect(() => {
      // Load the logged-in user from localStorage (or your auth context)
      setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);


  const services_toggleDropdown = () => {
    setServicesDropdownOpen((prev) => !prev); // Toggle services dropdown
    
  };
  const navigate = useNavigate();


  const generateAvatar = () => {
    if (loggedInUser) { // Only generate an avatar if loggedInUser is valid
      const initials = loggedInUser
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
      return (
      
        <div className='flex items-center'>
          <div className='mr-3'>
            <p className='font-extralight'><i>{loggedInUser}</i></p>
          </div>
          <div 
            className="avatar flex items-center justify-center w-10 h-10 rounded-full bg-[#4DA1A9]  text-white font-bold cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300" 
            onClick={() => navigate('/wallet')}
          >
            
            {initials}
          </div>  
        </div>
        
        
      );
    }
    return null; // Return null if there's no valid loggedInUser
  };
  // Empty dependency
  return (
    <nav id='nav-bar' className='nav-section  flex justify-between items-center p-2 px-5 text-[18px] w-[100%] bg-[#F6F4F0] text-[#2E5077]'>
      <div className='logo-header flex items-center gap-2'>
        <img src={logo} onClick={() =>navigate('/')} alt="" className="cursor-pointer h-10 w-10" />
        <p className='font-bold '>Digital Wallet</p>
      </div>
      <div className='nav-links relative'>
        <ul className="link-item flex gap-6 font-semibold">
          <li className="cursor-pointer hover:scale-105  transition-transform duration-100" onClick={() => navigate('/')}>Home</li>
          <li className="relative cursor-pointer hover:scale-105 transition-transform duration-100" onClick={services_toggleDropdown}>
            Services
            <ServicesDropDown isOpen={services_dropdownOpen}/>
          </li>
          
          
          <li className="cursor-pointer hover:scale-105 transition-transform duration-100">About</li>
        </ul>
      </div>
      {loggedInUser && loggedInUser !== 'undefined' ? (
        generateAvatar() 
      ) : (
        <div 
          className='signup-btn cursor-pointer flex items-center gap-1 bg-[#4DA1A9] px-[8px] py-2 rounded-[5px] hover:shadow-lg hover:scale-105 transition-transform duration-300' 
          onClick={() => navigate('/login')}
        >
          <button className='font-semibold text-white text-[14px]'>Login</button>
          <LoginIcon className='text-white' fontSize='small'/>
        </div>
      )}

    </nav>
  );
}

export default Navheader;
