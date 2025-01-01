import { useRef, useEffect, useState } from "react";
import React from 'react';

const TransactionList = () => {
  const containerRef = useRef();
  const [transactions, setTransactions] = useState([
    { date: "2024-01-01", amount: "₹1000", upiId: "user@bank" },
    { date: "2024-01-02", amount: "₹500", upiId: "shop@bank" },
    { date: "2024-01-03", amount: "₹250", upiId: "merchant@bank" },
    { date: "2024-01-04", amount: "₹700", upiId: "service@bank" },
    { date: "2024-01-05", amount: "₹1200", upiId: "travel@bank" },
    { date: "2024-01-03", amount: "₹250", upiId: "merchant@bank" },
    { date: "2024-01-04", amount: "₹700", upiId: "service@bank" },
    { date: "2024-01-05", amount: "₹1200", upiId: "travel@bank" },
    { date: "2024-01-05", amount: "₹1200", upiId: "travel@bank" },
    { date: "2024-01-03", amount: "₹250", upiId: "merchant@bank" },
    { date: "2024-01-04", amount: "₹700", upiId: "service@bank" },
    { date: "2024-01-05", amount: "₹1200", upiId: "travel@bank" },
  ]);

  useEffect(() => {
    // Scroll to the bottom whenever the component is rendered or updated
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transactions]); // This will trigger when 'transactions' array changes

  const addTransaction = () => {
    // Add a new transaction with dummy data (you can customize this as needed)
    const newTransaction = {
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      amount: `₹${Math.floor(Math.random() * 2000 + 1)}`, // Random amount
      upiId: `random@bank${Math.floor(Math.random() * 100)}` // Random UPI ID
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    
      
      <div
        className="w-full h-[100%] p-[10px] flex flex-col items-center text-center overflow-y-auto overflow-x-hidden ]"
        ref={containerRef}
      >
        {transactions.map((transaction, index) => (
          <div key={index} className="h-[200px] rounded-lg m-[7px] p-6 w-full flex justify-around px-4 items-center  cursor-pointer  border-b hover:border-gray-400">
            <div className="text-sm font-semibold">{transaction.date}</div>
            <div className="text-sm"> {transaction.upiId}</div>
            <div className="text-sm">{transaction.amount}</div>
            
          </div>
        ))}
      </div>
    
  );
};

export default TransactionList;
