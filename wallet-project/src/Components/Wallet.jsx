import React from 'react'
import Navheader from './Navheader'
import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';
import "./Styles.css"
import TransactionList from './TransactionList.jsx'
function Wallet() {
  return (
    <div className="main-container scrollbar-thin scrollbar-thumb-[#2E5077] scrollbar-track-[#ffffff] w-[100%] min-h-screen m-0 p-0 overflow-x-hidden  flex flex-col">
      <Navheader />
      <WalletPage />
    </div>
  );
}

export default Wallet;

function WalletPage() {
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
  return (
    <div className="inside-container flex m-[30px] flex-grow">
      {/* <div className="main-wallet bg-[#4DA1A9] rounded-xl w-[20%] h-100px m-[5px] text-center">
        <div className="dashboard"></div>
      </div> */}
      <div className="main-wallet bg-white w-[80%] rounded-xl m-[5px] text-center flex flex-col flex-grow items-center justify-center py-6">
        <div className="wallet-display shadow-lg rounded-lg pb-4 w-[95%] bg-[#F6F4F0] m-[10px] flex justify-between">
          <div className="rounded-lg flex-col flex-grow">
            <div className="text-start text-[40px] font-bold px-4 py-2 m-[10px] w-max">
              My Wallet
            </div>
            <div className="text-start text-[40px] font-semibold px-6 w-max text-[#2E5077]">
              <p className="text-sm px-1 w-max">Current balance in your wallet</p>
              $0.00
            </div>
          </div>
          <div className="rounded-lg w-max m-[10px] flex justify-center items-center mr-[50px]">
            <button className="add-money-btn bg-[#4DA1A9] w-[100px] h-[50px] rounded-lg text-white">
              Add Money
            </button>
          </div>
        </div>
        <div className=" rounded-lg shadow-lg h-[30%] w-[95%]  flex flex-grow justify-between">
          <div className='transaction-graph-display shadow-lg  rounded-lg w-[70%] '>
            <div className="text-start text-[25px] font-bold px-4 py-2 m-[10px] w-max">
              Transaction Graph
            </div>
            <div className='graph py-2 px-6'>
              <Graph type="line" labels={labels} dataset={dataset} />
            </div>  
          </div>
        
          <div className='transaction-history-display shadow-lg w-[30%]  '>
            
            <div className=" rounded-lg w-[95%]  bg-[#F6F4F0]  flex flex-col">
              <div className="text-start text-[25px] font-bold px-4 py-2 w-full m-[10px]">
                History
              </div>
              <TransactionList />
                
             
                


                {/* Ill add the down array which will display history with more than 4 entries */}
              
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
const Graph = ({ type, labels, dataset }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance before creating a new one
    let chartInstance;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type, // Chart type (e.g., 'bar', 'line')
        data: {
          labels, // X-axis labels
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
