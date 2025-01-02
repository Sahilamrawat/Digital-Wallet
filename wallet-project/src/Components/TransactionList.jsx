import { useRef, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import React from "react";

const TransactionList = () => {
  const containerRef = useRef();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null); // Define error state
  const [loading, setLoading] = useState(true); // Define loading state

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:8080/auth/getWallet",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Access the correct path to `sendMoney`
        const sendMoney = response.data.user?.wallet?.sendMoney || [];
        setTransactions(sendMoney);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching wallet data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // useEffect(() => {
  //   // Scroll to the bottom whenever the component is rendered or updated
  //   if (containerRef.current) {
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  // }, [transactions]); // Trigger when 'transactions' array changes

  // Handle loading and error states
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div
      className="w-full h-full p-4 flex flex-col items-center text-center overflow-y-auto overflow-x-hidden"
      ref={containerRef}
    >
      {transactions.length === 0 ? (
        <div className="text-gray-500">No transactions available</div>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={index}
            className="h-max rounded-lg my-2 p-4 w-full flex flex-col flex-grow justify-around px-4 items-start cursor-pointer border-b hover:border-gray-400"
          >
            <div className="text-sm"><span className="font-bold">Sender Upi: </span>{transaction.SenderUpiId}</div>
            <div className="text-sm"><span className="font-bold">Receiver Upi: </span>{transaction.ReceiverUpiId}</div>
            <div className="text-sm"><span className="font-bold">Amount: </span>₹{transaction.Amount}</div>
            <div className="text-sm">
              <span className="font-bold">Date: </span>
              {new Intl.DateTimeFormat('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(new Date(transaction.Date))}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
