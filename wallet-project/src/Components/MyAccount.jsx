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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSearchParams } from 'react-router-dom';

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
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  const menuItems = [
    { name: 'Profile' },
    { name: 'My Wallet' },
    { name: 'Logout' },
    { name: 'Home', icon: <ArrowBackIcon className="mr-2" /> },
  ];
  useEffect(() => {
        const indexFromParams = parseInt(searchParams.get('activeIndex'), 10);
        if (!isNaN(indexFromParams) && indexFromParams >= 0 && indexFromParams < menuItems.length) {
            setActiveIndex(indexFromParams);
        }
  }, [searchParams]);
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
              className={`cursor-pointer py-5 px-4 rounded-l-3xl text-white font-semibold flex items-center ${
                activeIndex === index ? 'bg-[#2E5077]' : 'hover:bg-[#35708E]'
              }`}
              onMouseEnter={() => setHoveredIndex(index)} // Track hover index
              onMouseLeave={() => setHoveredIndex(null)} // Reset hover index
              onClick={() => {
                setActiveIndex(index);
                if (index === 2) {
                  alert('Logging out ...');
                  // localStorage.setItem('loggedInUser', undefined);
                  localStorage.clear();
                  navigate('/login');
                }
                if (index === 3) {
                  navigate('/');
                }
              }}
            >
              {hoveredIndex === index && item.icon /* Show icon only on hover */}
              {item.name}
            </li>
          ))}
        </ul>
        </div>
      </div>
   
      {activeIndex === 0 && <Profile />}
      {activeIndex === 1 && < MyWallet/>}
      

      
    </div>
  );
}



