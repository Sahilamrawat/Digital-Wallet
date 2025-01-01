import React from 'react';
import Navheader from './Navheader.jsx';
import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './Styles.css';
import TransactionList from './TransactionList.jsx';
import { Link } from 'react-router-dom';
import MyWallet  from './MyWallet.jsx';
import Profile from './Profile.jsx';
import ManageAccount from './ManageAccount.jsx';
import ManageUPI from './ManageUpi.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MyAccount() {
  return (
    <div className="main-container scrollbar-thin scrollbar-thumb-[#2E5077] scrollbar-track-[#ffffff] w-[100vw] h-[100vh] m-0 p-0 overflow-x-hidden overflow-y-hidden flex flex-col">
      <WalletPage />
    </div>
  );
}

export default MyAccount;

function WalletPage() {
  const [activeIndex, setActiveIndex] = React.useState(0); // Track active li index
  const navigate = useNavigate(); 
  const menuItems = [
    { name: 'Profile' },
    { name: 'My Wallet' },
    { name: 'Manage Account' },
 
    { name: 'Logout' },
    { name: 'Home' },
   
  ];

  return (
    <div className="inside-container flex h-[100vh] ">
      <div className="main-wallet-dashboard bg-[#4DA1A9] rounded w-[20%] h-full flex flex-col">
        <div className="logo-header flex items-center justify-start py-8 px-2 w-full">
          <img
            src={logo}
            onClick={() => navigate('/')}
            alt="Logo"
            className="cursor-pointer h-16 w-16 text-[#4DA1A9]"
          />
          <p className="font-bold mt-3 text-[25px] text-white">Digital Wallet</p>
        </div>
        <div>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                
                className={`cursor-pointer py-5 px-4 rounded-l-3xl text-white font-semibold ${
                  activeIndex === index ? 'bg-[#2E5077]' : 'hover:bg-[#35708E] '
                }`}
                onClick={() => {
                  setActiveIndex(index); // Set the active menu item
                  // navigate(item.path); // Navigate to the selected path
                  if(index===3){
                    alert('Logging out ...')
                    localStorage.setItem('loggedInUser',undefined)
                    navigate('/login')
                  }
                  if(index===4){
                    
                    navigate('/')
                  }
                  
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
   
      {activeIndex === 0 && <Profile />}
      {activeIndex === 1 && < MyWallet/>}
      {activeIndex === 2 && <ManageAccount />}
      {activeIndex === 3 && <ManageUPI />}
      

      
    </div>
  );
}



