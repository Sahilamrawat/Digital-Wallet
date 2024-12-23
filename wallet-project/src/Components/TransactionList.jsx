import { useRef, useEffect, useState } from "react";
import React from 'react';

const TransactionList = () => {
  const containerRef = useRef();
  const [transactions, setTransactions] = useState([
    "Transaction 1", "Transaction 2", "Transaction 3", "Transaction 4", 
    "Transaction 5", "Transaction 6", "Transaction 7", "Transaction 8",
    "Transaction 9", "Transaction 10", "Transaction 11", "Transaction 12",
    "Transaction 13"
  ]);

  useEffect(() => {
    // Scroll to the bottom whenever the component is rendered or updated
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transactions]); // This will trigger when 'transactions' array changes

  const addTransaction = () => {
    // Example: Adding a new transaction to simulate a dynamic list
    setTransactions([...transactions, `Transaction ${transactions.length + 1}`]);
  };

  return (
    <div>
      <button onClick={addTransaction} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Add Transaction
      </button>
      <div
        className="w-full h-[500px] p-[10px] flex flex-col items-center justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-[#2E5077] scrollbar-track-[#ffffff]"
        ref={containerRef}
      >
        {transactions.map((transaction, index) => (
          <div key={index} className="h-[50px] rounded-lg m-[7px] w-[max] bg-[#D9EAFD] flex justify-start px-4 items-center">
            {transaction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
