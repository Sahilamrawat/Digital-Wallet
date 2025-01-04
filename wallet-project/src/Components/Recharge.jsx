import React, { useState, useEffect } from 'react';
import Navheader from './Navheader';
import RechargeImage from '../assets/recharge-mobile.svg';
import ElectricityImage from '../assets/Electricity.svg';
import DTHImage from '../assets/DTH.svg';
import WaterImage from '../assets/Water.svg';
import EducationImage from '../assets/Education.svg';     
import RechargeMobileImage from '../assets/RechargeMobile.svg';
import ElectricityBillImage from '../assets/ElectricityBillImage.svg';
import DthImage from '../assets/DthImage.svg';
import WaterBillImage from '../assets/WaterBillImage.svg';
import EducationFeeImage from '../assets/EducationFeeImage.svg';
import BroadbandBillImage from '../assets/BroadbandBillImage.svg';
import GasBillImage from '../assets/GasBillImage.svg';
import GasImage from '../assets/Gas.svg';     
import BroadbandImage from '../assets/broadband.svg';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import Footer from './Footer';
function Recharge() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden">
      <Navheader />
      <RechargePage />
      <Footer/>
    </div>
  );
}

export default Recharge;

function RechargePage() {
  const [activeIndex, setActiveIndex] = useState(0); // Track active section
  const navigate = useNavigate();
      const [searchParams] = useSearchParams();
  // const initialIndex = location.state?.activeIndex || 0;

  const menuItems = [
    'Recharge Mobile',
    'Electricity Bill',
    'DTH Recharge',
    'Water Bill',
    'Education Fee',
    'Gas Bill',
    'Broadband Bill',
  ];

  const backgroundImages = [
          RechargeMobileImage, 
          ElectricityBillImage, 
          DthImage, 
          WaterBillImage,
          EducationFeeImage, 
          GasBillImage, 
          BroadbandBillImage, 
      ];
  const handleItemClick = (index) => {
    setActiveIndex(index); // Set the active section
  };
  useEffect(() => {
      const indexFromParams = parseInt(searchParams.get('activeIndex'), 10);
      if (!isNaN(indexFromParams) && indexFromParams >= 0 && indexFromParams < menuItems.length) {
          setActiveIndex(indexFromParams);
      }
  }, [searchParams]);
  return (
    <>
      <nav className="recharge-nav-bar flex justify-evenly bg-[#4DA1A9] items-center text-white text-xl w-[100%] h-[5%] ">
        {menuItems.map((item, index) => (
          <p
            key={index}
            className={`cursor-pointer transition-transform duration-300 ${
              activeIndex === index
                ? 'text-[#2E5077] hover:text-[#2E5077] scale-105'
                : 'hover:text-[#2E5077] hover:scale-105'
            }`}
            onClick={() => handleItemClick(index)} // Handle menu item click
          >
            {item}
          </p>
        ))}
      </nav>
      <div
        className="bg-cover bg-left bg-[#4DA1A9] bg-no-repeat h-[70%] w-[100%] flex flex-col items-center space-y-10 justify-center"
        style={{
          backgroundImage: `url(${backgroundImages[activeIndex]})`, // Apply background dynamically
          backgroundSize: 'contain', // Ensure the background covers the whole section
          backgroundPosition: 'center', // Center the background image
        }}
      >
        <h1
          className="text-[100px] text-white hover:scale-105 transition-transform duration-500"
        >
          {activeIndex === 0 && "Recharge Mobile"}
          {activeIndex === 1 && "Electricity Bill"}
          {activeIndex === 2 && "DTH Recharge"}
          {activeIndex === 3 && "Water Bill"}
          {activeIndex === 4 && "Education Fee"}
          {activeIndex === 5 && "Gas Bill"}
          {activeIndex === 6 && "Broadband"}
        </h1>
      </div>
      <div className="w-[100%] flex flex-col items-center justify-center">
        {/* Render the form based on the activeIndex */}
        <div className="recharge-form-container bg-[#F6F4F0] w-[100%] h-max flex justify-center items-center">
          {activeIndex === 0 && <RechargeMobile />}
          {activeIndex === 1 && <ElectricityBill />}
          {activeIndex === 2 && <DTHRecharge />}
          {activeIndex === 3 && <WaterBill />}
          {activeIndex === 4 && <EducationFee />}
          {activeIndex === 5 && <GasBill />}
          {activeIndex === 6 && <BroadbandBill />}
        </div>
      </div>
    </>
  );
}


function RechargeMobile() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('');
  const [planType, setPlanType] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || !amount || !operator || !planType) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    setIsSubmitted(true);
    console.log(
      `Recharging mobile number: ${phoneNumber} for ₹${amount} with operator: ${operator}, plan type: ${planType}, and promo code: ${promoCode || 'None'}`
    );
  };

  return (
    <>
      <div>
        <img src={RechargeImage} alt="image" className="w-[600px] h-[600px]" />
      </div>
      <div className="recharge-form-container w-[30%] h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
          Mobile Recharge
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="space-y-10 flex flex-col justify-center items-center"
        >
          <div className="form-group w-[100%]">
            <label
              htmlFor="phoneNumber"
              className="text-[#2E5077] font-semibold"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="operator" className="text-[#2E5077] font-semibold">
              Mobile Operator
            </label>
            <select
              id="operator"
              name="operator"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            >
              <option value="" disabled>
                Select your operator
              </option>
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi (Vodafone Idea)</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>
          <div className="form-group w-[100%]">
              <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
                  UPI Id
              </label>
              <input
                  type="text"
                  id="UpiId"
                  name="UpiId"
                  value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                  disabled
                  placeholder="Enter your UPI Id"
                  className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  required
              />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="planType" className="text-[#2E5077] font-semibold">
              Plan Type
            </label>
            <select
              id="planType"
              name="planType"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            >
              <option value="" disabled>
                Select plan type
              </option>
              <option value="Prepaid">Prepaid</option>
              <option value="Postpaid">Postpaid</option>
            </select>
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="amount" className="text-[#2E5077] font-semibold">
              Recharge Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter recharge amount"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="promoCode" className="text-[#2E5077] font-semibold">
              Promo Code (Optional)
            </label>
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
            />
          </div>

          <button
            type="submit"
            className="w-max py-3 mt-4 bg-[#4DA1A9] text-white font-semibold rounded-lg hover:bg-[#35708E] p-4 hover:text-[#2E5077] transition duration-200"
          >
            Recharge Now
          </button>
        </form>

        {isSubmitted && (
          <div className="text-green-500 text-center mt-4">
            Recharge successful! A confirmation SMS will be sent to your mobile
            number.
          </div>
        )}
      </div>
    </>
  );
}

// Dummy components for other sections (can replace with actual logic later)
function ElectricityBill() {
  const [UpiId, setUpiId] = useState('');
  const [providerName, setProviderName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!UpiId || !providerName || !customerName || !billingCycle || !amount) {
          setError('Please fill all mandatory fields');
          return;
      }
      setError('');
      setIsSubmitted(true);
      console.log(`Paying Electricity Bill:
          Provider: ${providerName},
          Account: ${UpiId},
          Customer: ${customerName},
          Cycle: ${billingCycle},
          Amount: ₹${amount},
          Email: ${email},
          Phone: ${phoneNumber}`);
  };

  return (
      <>
          <div>
              <img src={ElectricityImage} alt="Electricity Bill" className="w-[500px] h-[500px]" />
          </div>
          <div className="recharge-form-container w-[30%] h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
                  Electricity Bill Payment
              </h2>

              {error && <div className="text-red-500 text-center mb-4">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-center items-center">
                  <div className="form-group w-[100%]">
                      <label htmlFor="providerName" className="text-[#2E5077] font-semibold">
                          Electricity Provider
                      </label>
                      <select
                          id="providerName"
                          name="providerName"
                          value={providerName}
                          onChange={(e) => setProviderName(e.target.value)}
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                          required
                      >
                          <option value="">Select your provider</option>
                          <option value="Tata Power">Tata Power</option>
                          <option value="Adani Electricity">Adani Electricity</option>
                          <option value="BSES Yamuna">BSES Yamuna</option>
                          <option value="MSEDCL">MSEDCL</option>
                          {/* Add more options as needed */}
                      </select>
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
                          UPI Id
                      </label>
                      <input
                          type="text"
                          id="UpiId"
                          name="UpiId"
                          value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                          disabled
                          placeholder="Enter your UPI Id"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                          required
                      />
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="customerName" className="text-[#2E5077] font-semibold">
                          Customer Name
                      </label>
                      <input
                          type="text"
                          id="customerName"
                          name="customerName"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter customer name"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                          required
                      />
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="billingCycle" className="text-[#2E5077] font-semibold">
                          Billing Cycle/Month
                      </label>
                      <input
                          type="text"
                          id="billingCycle"
                          name="billingCycle"
                          value={billingCycle}
                          onChange={(e) => setBillingCycle(e.target.value)}
                          placeholder="Enter billing cycle or month"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                          required
                      />
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="amount" className="text-[#2E5077] font-semibold">
                          Payment Amount (₹)
                      </label>
                      <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter the payment amount"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                          required
                      />
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="email" className="text-[#2E5077] font-semibold">
                          Email ID (Optional)
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email ID (optional)"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      />
                  </div>

                  <div className="form-group w-[100%]">
                      <label htmlFor="phoneNumber" className="text-[#2E5077] font-semibold">
                          Mobile Number (Optional)
                      </label>
                      <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your mobile number (optional)"
                          className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      />
                  </div>

                  <button
                      type="submit"
                      className="w-max py-3 mt-4 bg-[#4DA1A9] text-white font-semibold rounded-lg hover:bg-[#35708E] p-4 hover:text-[#2E5077] transition duration-200"
                  >
                      Pay Bill
                  </button>
              </form>

              {isSubmitted && (
                  <div className="text-green-500 text-center mt-4">
                      Payment successful! A confirmation message will be sent to your registered contact details.
                  </div>
              )}
          </div>
      </>
  );
}

  

function DTHRecharge() {
  const [customerId, setCustomerId] = useState('');
  const [provider, setProvider] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || !provider || !mobileNumber || !email || !amount) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setIsSubmitted(true);
    console.log(`Recharging DTH:
      Customer ID: ${customerId},
      Provider: ${provider},
      Mobile: ${mobileNumber},
      Email: ${email},
      Amount: ₹${amount}`);
  };

  return (
    <>
      <div>
        <img src={DTHImage} alt="DTH Recharge" className="w-[550px] h-[550px]" />
      </div>
      <div className="recharge-form-container w-[30%] h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
          DTH Recharge
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-10 flex flex-col justify-center items-center">
          <div className="form-group w-full">
            <label htmlFor="customerId" className="text-[#2E5077] font-semibold">
              Customer ID
            </label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter your customer ID"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="provider" className="text-[#2E5077] font-semibold">
              DTH Provider
            </label>
            <select
              id="provider"
              name="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            >
              <option value="">Select your provider</option>
              <option value="Airtel Digital TV">Airtel Digital TV</option>
              <option value="Dish TV">Dish TV</option>
              <option value="Tata Play">Tata Play</option>
              <option value="Sun Direct">Sun Direct</option>
              <option value="Videocon d2h">Videocon d2h</option>
            </select>
          </div>
          <div className="form-group w-[100%]">
              <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
                  UPI Id
              </label>
              <input
                  type="text"
                  id="UpiId"
                  name="UpiId"
                  value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                  disabled
                  placeholder="Enter your UPI Id"
                  className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  required
              />
          </div>

          <div className="form-group w-full">
            <label htmlFor="mobileNumber" className="text-[#2E5077] font-semibold">
              Registered Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your registered mobile number"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="email" className="text-[#2E5077] font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="amount" className="text-[#2E5077] font-semibold">
              Recharge Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter recharge amount"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-max py-3 mt-4 bg-[#4DA1A9] text-white font-semibold rounded-lg hover:bg-[#35708E] p-4 hover:text-[#2E5077] transition duration-200"
          >
            Recharge Now
          </button>
        </form>

        {isSubmitted && (
          <div className="text-green-500 text-center mt-4">
            Recharge successful! Enjoy your channels.
          </div>
        )}
      </div>
    </>
  );
}
  

function WaterBill() {
  const [UpiId, setUpiId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [area, setArea] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!UpiId || !customerName || !email || !mobileNumber || !area || !amount) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setIsSubmitted(true);
    console.log(`Water Bill Payment:
      UPI Id: ${UpiId},
      Customer Name: ${customerName},
      Email: ${email},
      Mobile: ${mobileNumber},
      Area/Zone: ${area},
      Amount: ₹${amount}`);
  };

  return (
    <>
      <div>
        <img src={WaterImage} alt="Water Bill" className="w-[600px] h-[450px]" />
      </div>
      <div className="recharge-form-container w-[30%] h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
          Water Bill Payment
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-10 flex flex-col justify-center items-center">
          <div className="form-group w-full">
            <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
              UPI Id
            </label>
            <input
              type="text"
              id="UpiId"
              name="UpiId"
              value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
              disabled
              placeholder="Enter your UPI Id"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="customerName" className="text-[#2E5077] font-semibold">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="email" className="text-[#2E5077] font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="mobileNumber" className="text-[#2E5077] font-semibold">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="area" className="text-[#2E5077] font-semibold">
              Area/Zone
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter your area or zone"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-full">
            <label htmlFor="amount" className="text-[#2E5077] font-semibold">
              Bill Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter bill amount"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-max py-3 mt-4 bg-[#4DA1A9] text-white font-semibold rounded-lg hover:bg-[#35708E] p-4 hover:text-[#2E5077] transition duration-200"
          >
            Pay Bill
          </button>
        </form>

        {isSubmitted && (
          <div className="text-green-500 text-center mt-4">
            Payment successful! Confirmation will be sent soon.
          </div>
        )}
      </div>
    </>
  );
}
  

function EducationFee() {
  const [studentName, setStudentName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentType, setStudentType] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [program, setProgram] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [organisationAccount, setOrganisationAccount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !studentName ||
      !studentId ||
      !studentType ||
      !email ||
      !phoneNumber ||
      !amount ||
      !paymentMode ||
      !organisationAccount ||// Validate Organisation UPI/Account
      !organizationName
    ) {
      setError('Please fill all mandatory fields');
      return;
    }

    // Additional validations for specific student types
    if (studentType === 'School Student' && !classGrade) {
      setError('Please select the grade for a school student');
      return;
    }

    if ((studentType === 'College Student' || studentType === 'Other') && (!program || !department)) {
      setError('Please fill the program and department for college or other students');
      return;
    }

    // Clear errors and mark submission
    setError('');
    setIsSubmitted(true);

    // Log the details for debugging or further processing
    console.log(
      `Paying ₹${amount} for ${studentType} ${studentName} (ID: ${studentId}) in ${organizationName} ${
        studentType === 'School Student' ? `Grade ${classGrade}` : `${program} (${department})`
      }. Organisation UPI/Account: ${organisationAccount}`
    );
  };

  return (
    <>
      <div>
        <img src={EducationImage} alt="image" className="w-[600px] h-[600px]" />
      </div>
      <div className="education-fee-form w-max h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
          Education Fee Payment
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-10 flex flex-col justify-center items-center">
          <div className='flex justify-between items-center space-x-4 w-full'>

          
          {/* Student Name */}
          <div className="form-group w-[100%]">
            <label htmlFor="studentName" className="text-[#2E5077] font-semibold">
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student's name"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          {/* Student ID */}
          <div className="form-group w-[100%]">
            <label htmlFor="studentId" className="text-[#2E5077] font-semibold">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter student's ID"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          </div>
          {/* Student Type */}
          <div className='flex justify-between items-center w-full space-x-4'>

          
          <div className="form-group w-[100%]">
            <label htmlFor="studentType" className="text-[#2E5077] font-semibold">
              Student Type
            </label>
            <select
              id="studentType"
              name="studentType"
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            >
              <option value="" disabled>
                Select Student Type
              </option>
              <option value="School Student">School Student</option>
              <option value="College Student">College Student</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {studentType === 'School Student' && (
            <div className="form-group w-[100%]">
              <label htmlFor="classGrade" className="text-[#2E5077] font-semibold">
                Grade
              </label>
              <input
                type="text"
                id="classGrade"
                name="classGrade"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                placeholder="Enter grade"
                className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                required
              />
            </div>
          )}
          </div>

          {(studentType === 'College Student' || studentType === 'Other') && (
            <>
              <div className='flex justify-between w-full space-x-4'>
              <div className="form-group w-[100%]">
                <label htmlFor="program" className="text-[#2E5077] font-semibold">
                  Program
                </label>
                <input
                  type="text"
                  id="program"
                  name="program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  placeholder="Enter program (e.g., B.Tech, M.Sc)"
                  className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  required
                />
              </div>

              <div className="form-group w-[100%]">
                <label htmlFor="department" className="text-[#2E5077] font-semibold">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Enter department (e.g., Computer Science)"
                  className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  required
                />
              </div>
              </div>
            </>
          )}

          <div className="form-group w-full">
            <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
              UPI Id
            </label>
            <input
              type="text"
              id="UpiId"
              name="UpiId"
              value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
              disabled
              placeholder="Enter your UPI Id"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          {/* Organisation UPI/Account Field */}
          <div className="form-group w-[100%]">
            <label htmlFor="organisationAccount" className="text-[#2E5077] font-semibold">
              Organisation UPI/Account
            </label>
            <input
              type="text"
              id="organisationAccount"
              name="organisationAccount"
              value={organisationAccount}
              onChange={(e) => setOrganisationAccount(e.target.value)}
              placeholder="Enter Organisation UPI/Account"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="organizationName" className="text-[#2E5077] font-semibold">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Enter organizations's name"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          {/* Email, Phone, Amount, Payment Mode */}
          <div className='flex justify-between w-full items-center space-x-4'>
          <div className="form-group w-[100%]">
            <label htmlFor="email" className="text-[#2E5077] font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="phoneNumber" className="text-[#2E5077] font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          </div>

          <div className='flex justify-between w-full items-center space-x-4'>
          <div className="form-group w-[100%]">
            <label htmlFor="amount" className="text-[#2E5077] font-semibold">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="paymentMode" className="text-[#2E5077] font-semibold">
              Payment Mode
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            >
              <option value="" disabled>
                Select Payment Mode
              </option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          </div>

          {/* Remarks */}
          <div className="form-group w-[100%]">
            <label htmlFor="remarks" className="text-[#2E5077] font-semibold">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks (optional)"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-max py-3 mt-4 bg-[#4DA1A9] p-4 text-white font-semibold rounded-lg hover:bg-[#35708E] hover:text-[#2E5077] transition duration-200"
          >
            Pay Now
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-10 p-5 border-2 border-[#4DA1A9] rounded-lg text-[#4DA1A9]">
            <h3 className="text-xl font-semibold">Payment Information:</h3>
            <p>Student Name: {studentName}</p>
            <p>Student ID: {studentId}</p>
            <p>Student Type: {studentType}</p>
            {studentType === 'School Student' ? (
              <p>Grade: {classGrade}</p>
            ) : (
              <p>Program: {program} - {department}</p>
            )}
            <p>Email: {email}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>Amount: ₹{amount}</p>
            <p>Payment Mode: {paymentMode}</p>
            <p>Organisation UPI/Account: {organisationAccount}</p>
            <p>Remarks: {remarks}</p>
          </div>
        )}
      </div>
    </>
  );
}
  
function GasBill() {
  const [customerNumber, setCustomerNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerNumber || !amount || !serviceProvider || !upiId || !email || !phone) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    setIsSubmitted(true);
    console.log(`Paying ₹${amount} for Gas Bill (Customer Number: ${customerNumber})`);
  };

  return (
      <>
      <div>
          <img src={GasImage} alt="image" className="w-[600px] h-[400px]"/>
      </div>
      <div className="gas-bill-form w-max h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
              Gas Bill Payment
          </h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-10 flex flex-col justify-center items-center">
              <div className="form-group w-[100%]">
                  <label htmlFor="customerNumber" className="text-[#2E5077] font-semibold">
                      Customer Number
                  </label>
                  <input
                      type="text"
                      id="customerNumber"
                      name="customerNumber"
                      value={customerNumber}
                      onChange={(e) => setCustomerNumber(e.target.value)}
                      placeholder="Enter customer number"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>

              <div className="form-group w-[100%]">
                  <label htmlFor="amount" className="text-[#2E5077] font-semibold">
                      Bill Amount (₹)
                  </label>
                  <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter bill amount"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>
              <div className="form-group w-full">
                <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
                  UPI Id
                </label>
                <input
                  type="text"
                  id="UpiId"
                  name="UpiId"
                  value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                  disabled
                  placeholder="Enter your UPI Id"
                  className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  required
                />
              </div>

              <div className="form-group w-[100%]">
                  <label htmlFor="serviceProvider" className="text-[#2E5077] font-semibold">
                      Service Provider
                  </label>
                  <input
                      type="text"
                      id="serviceProvider"
                      name="serviceProvider"
                      value={serviceProvider}
                      onChange={(e) => setServiceProvider(e.target.value)}
                      placeholder="Enter service provider name"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>

              <div className="form-group w-[100%]">
                  <label htmlFor="upiId" className="text-[#2E5077] font-semibold">
                      Provider UPI ID or Bank Account Name
                  </label>
                  <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter Provider UPI ID or Bank Account Name"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>

              <div className='flex justify-between w-full space-x-4'>

              
              <div className="form-group w-[100%]">
                  <label htmlFor="email" className="text-[#2E5077] font-semibold">
                      Email Address
                  </label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>

              <div className="form-group w-[100%]">
                  <label htmlFor="phone" className="text-[#2E5077] font-semibold">
                      Phone Number
                  </label>
                  <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                      required
                  />
              </div>
              </div>
              <div className="form-group w-[100%]">
                  <label htmlFor="remarks" className="text-[#2E5077] font-semibold">
                      Remarks (Optional)
                  </label>
                  <textarea
                      id="remarks"
                      name="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Enter any remarks"
                      className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                  ></textarea>
              </div>

              <button
                  type="submit"
                  className="w-max py-3 mt-4 bg-[#4DA1A9] text-white font-semibold rounded-lg hover:bg-[#35708E] p-4 hover:text-[#2E5077] transition duration-200"
              >
                  Pay Now
              </button>
          </form>

          {isSubmitted && (
              <div className="text-green-500 text-center mt-4">
                  Payment successful! A receipt will be sent to your email.
              </div>
          )}
      </div>
      </>
  );
}

  
function BroadbandBill() {
  const [serviceProvider, setServiceProvider] = useState('');
  const [upiId, setUpiId] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceProvider || !upiId || !registeredName || !email || !phone || !amount) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setIsSubmitted(true);
    console.log(`Paying ₹${amount} for Broadband Bill`);
    console.log(`Service Provider: ${serviceProvider}`);
    console.log(`UPI Id: ${upiId}`);
    console.log(`Registered Name: ${registeredName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
  };

  return (
    <>
      <div>
        <img src={BroadbandImage} alt="Broadband image" className="w-[600px] h-[600px]" />
      </div>
      <div className="broadband-bill-form w-max h-max m-10 bg-[#fcfaf8] p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2E5077] mb-10 text-center">
          Broadband Bill Payment
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-10 flex flex-col justify-center items-center">
          <div className='flex justify-between items-center space-x-4'>
          <div className="form-group w-[100%]">
            <label htmlFor="serviceProvider" className="text-[#2E5077] font-semibold">
              Service Provider Name
            </label>
            <input
              type="text"
              id="serviceProvider"
              name="serviceProvider"
              value={serviceProvider}
              onChange={(e) => setServiceProvider(e.target.value)}
              placeholder="Enter service provider name"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          <div className="form-group w-[100%]">
            <label htmlFor="registeredName" className="text-[#2E5077] font-semibold">
              Registered Name
            </label>
            <input
              type="text"
              id="registeredName"
              name="registeredName"
              value={registeredName}
              onChange={(e) => setRegisteredName(e.target.value)}
              placeholder="Enter registered name"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          </div>


          <div className="form-group w-full">
            <label htmlFor="UpiId" className="text-[#2E5077] font-semibold">
              UPI Id
            </label>
            <input
              type="text"
              id="UpiId"
              name="UpiId"
              value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
              disabled
              placeholder="Enter your UPI Id"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>


          <div className="form-group w-[100%]">
            <label htmlFor="upiId" className="text-[#2E5077] font-semibold">
              Service Provider UPI Id
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter UPI Id"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          
          <div className='flex justify-between items-center space-x-4 w-full'>

        
          <div className="form-group w-[100%]">
            <label htmlFor="email" className="text-[#2E5077] font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="phone" className="text-[#2E5077] font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>
          </div>

          <div className="form-group w-[100%]">
            <label htmlFor="amount" className="text-[#2E5077] font-semibold">
              Bill Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter bill amount"
              className="w-full p-3 border-2 border-[#2E5077] rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-max py-3 mt-4 bg-[#4DA1A9] p-4 text-white font-semibold rounded-lg hover:bg-[#35708E] hover:text-[#2E5077] transition duration-200"
          >
            Pay Now
          </button>
        </form>

        {isSubmitted && (
          <div className="text-green-500 text-center mt-4">
            Payment successful! A confirmation will be sent shortly.
          </div>
        )}
      </div>
    </>
  );
}

  
