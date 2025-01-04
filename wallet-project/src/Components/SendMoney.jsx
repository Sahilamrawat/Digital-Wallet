import React, { useState } from "react";
import Navheader from '../Components/Navheader';
import image from '../assets/send-money-page.svg';
import axios from 'axios'; // Import axios for making API requests
import Footer from "./Footer";
import SendMoneyHero from '../assets/SendMoneyHero.svg';

function SendMoney() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden">
        <Navheader />
        <SendMoneyPage />
        <Footer />
    </div>
  );
}

export default SendMoney;

const SendMoneyPage = () => {
    const [receiverUpiId, setReceiverUpiId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentType, setPaymentType] = useState("UPI");
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success or failure
  
    const handleSend = async () => {
      setShowPasswordModal(true);
    };
  
    const handleConfirmPassword = async () => {
      try {
        const storedUsername = localStorage.getItem("loggedInUser");
        
        // Check if the entered password matches the stored username
        if (password !== storedUsername) {
          setMessage("Transaction Failed! Incorrect Password.");
          setMessageType("failure");
          return;
        }
    
        // Proceed with the API request if the password is correct
        const senderUpiId = localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1");
        const token = localStorage.getItem('token'); // JWT token for authorization
    
        const response = await axios.post(
          'http://localhost:8080/auth/sendMoney',
          {
            SenderUpiId: senderUpiId,
            ReceiverUpiId: receiverUpiId,
            Amount: amount
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
    
        if (response.data.success) {
          setMessage("Transaction Successful!");
          setMessageType("success");
        } else {
          setMessage(response.data.message || "Transaction Failed!");
          setMessageType("failure");
        }
      } catch (error) {
        setMessage("Transaction Failed! Error: " + error.message);
        setMessageType("failure");
      } finally {
        setShowPasswordModal(false);
      }
    };
    
  
    const handleCloseMessage = () => {
      setMessage("");
      setMessageType("");
    };
  
    return (
      <>
      <div className="  flex  items-center gap-5 border-b p-2 py-5">  
        
        <div className="m-auto">
          <h1 className="font-bold text-[50px] text-[#2E5077]">"Send Money, Share Smiles!"</h1>
          <p className="p-2 ml-3">
          Sending money has never been easier. <br />
           Whether it's for a loved one, a business, or a cause you care about,
          transfer funds securely and instantly. <br />
           Empower connections and create positive impact with every transaction.
          </p>
        </div>
        <div className="h-max">
          <img src={SendMoneyHero} className="w-[800px] h-[500px]" alt="hero" />
        </div>
        
      </div>
    
      <div className="bg-[#F6F4F0] w-[100%] h-[100%] flex items-center justify-center">
        
        <div>
            <img src={image} alt="Send Money" className="w-[600px] h-[600px]" />
        </div>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Send Money</h1>
  
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              User Name:
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-700">
              {localStorage.getItem("loggedInUser")}
            </p>
          </div>
  
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Sender UPI ID:
              </label>
              <input
                type="text"
                value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                disabled
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 w-full text-gray-500 cursor-not-allowed"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Receiver UPI ID:
              </label>
              <input
                type="text"
                value={receiverUpiId}
                onChange={(e) => setReceiverUpiId(e.target.value.trim())} // Trim spaces
                placeholder="Enter Receiver's UPI ID"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Amount:
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Payment Type:
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
  
            <div>
              <button
                type="button"
                onClick={handleSend}
                className="w-full bg-[#2E5077] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
  
        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold text-center mb-4">
                Enter Password
              </h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPassword}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Success/Failure Message */}
        {message && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
              <p
                className={`text-xl font-semibold ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
              <button
                onClick={handleCloseMessage}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
    </>
    );
};
