import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TransactionList from './TransactionList.jsx'
import Chart from 'chart.js/auto';

function MyWallet() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState(''); // State for payment type

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dataset = [
    {
      label: 'All Transactions',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8080/auth/getWallet',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setBalance(response.data.user.wallet.balance);
            localStorage.setItem('userWalletUpi', JSON.stringify(response.data.user.wallet.UpiId)); 
            setTransactions(response.data.transactions || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching wallet data');
        } finally {
            setLoading(false);
        }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Handle adding money and updating wallet
  const handleChange = async (balanceChange, transactionType) => {
    try {
        if (typeof balanceChange !== 'number' || balanceChange <= 0) {
            alert("Invalid balance change value. Must be a positive number.");
            return;
        }
        if (!['add', 'send'].includes(transactionType)) {
            alert("Invalid transaction type. Must be 'add' or 'send'.");
            return;
        }

        const token = localStorage.getItem('token');
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/updateWallet',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: { balanceChange, transactionType },
        });

        if (response.data.success) {
            setBalance(response.data.wallet.balance); // Update the balance
            setTransactions(prevTransactions => [
                ...prevTransactions,
                { type: transactionType, amount: balanceChange, date: new Date().toLocaleString() },
            ]);
            alert("Wallet updated successfully.");
        } else {
            alert(response.data.message || "Failed to update wallet.");
        }
    } catch (err) {
        console.error("Error updating wallet:", err);
        alert("Error updating wallet. Please try again.");
    }
  };

  // Display loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle modal submit (Add Money form submission)
  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!paymentType) {
      alert("Please select a payment type.");
      return;
    }

    handleChange(numericAmount, 'add');
    setAmount(''); // Clear the amount input
    setPaymentType(''); // Clear the payment type input
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="main-wallet bg-gray-100 w-[80%]   overflow-y-scroll rounded-xl text-center flex flex-col flex-grow items-center py-6">
      <div className="wallet-display shadow-md rounded-lg pb-4 w-[95%] bg-white m-[10px] flex justify-between">
        <div className="rounded-lg flex-col flex-grow">
          <div className="text-start text-[40px] font-bold px-4 py-2 m-[10px] w-max">
            My Wallet
          </div>
          <div className="text-start text-[40px] font-semibold px-6 w-max text-[#2E5077]">
            <p className="text-sm px-1 w-max">Current balance in your wallet</p>
            {balance !== null && balance !== undefined ? `₹${balance.toFixed(2)}` : 'Loading...'}
          </div>
        </div>
        <div className="rounded-lg w-max m-[10px] flex justify-center items-center mr-[50px]">
          <button
            className="add-money-btn bg-[#4DA1A9] w-[100px] h-[50px] rounded-lg text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Money
          </button>
        </div>
      </div>

      <div className="rounded-lg shadow-md w-[95%] h-[50%] bg-white flex flex-grow justify-between">
        <div className="transaction-graph-display rounded-lg w-[60%]  ">
          <div className="text-start text-[25px] font-bold px-4 py-2 m-[10px] w-max">
            Transaction Graph
          </div>
          <div className="graph py-2 px-6 w-[100%] h-[100%] ">
            <WeeklyTransactionGraph />
          </div>
        </div>

        <div className="transaction-history-display p-4 w-[40%] h-[100%]">
          <div className="rounded-lg w-[100%]  h-[100%] flex flex-col ">
            <div className="text-start text-[25px] font-bold px-4 py-2 w-full m-[10px]">
              History
            </div>
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {isModalOpen && (
        <div className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add Money</h2>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter amount"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
              <select
                id="paymentType"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="">Select Payment Type</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Graph = ({ type, labels, dataset }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type,
        data: {
          labels,
          datasets: dataset,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [type, labels, dataset]);

  return <canvas ref={chartRef} />;
};

const WeeklyTransactionGraph = () => {
  const [transactions, setTransactions] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }

        const response = await axios.get("http://localhost:8080/auth/getWeeklyTransactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setTransactions(response.data.weeklyTransactions);
        } else {
          setError("Failed to fetch transactions");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching transactions");
      }
    };

    fetchWeeklyTransactions();
  }, []);

  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const   dataset = [
    {
      label: "All Transactions",
      data: labels.map((day) => transactions[day] || 0), // Map data to the correct labels
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 159, 192, 1)',
      ],
      borderWidth: 1,
    },
  ];

  if (error) return <p>{error}</p>;

  return <Graph type="line" labels={labels} dataset={dataset} />;
};

export default MyWallet;
