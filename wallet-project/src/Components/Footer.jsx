import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
function Footer() {
    const navigate = useNavigate();
  return (
    <div className='w-[100%] h-[300px]  text-black '>
        <footer
          className="w-[100%] text-center text-lg-start  text-black bg-[#ffffff]"
     
          >
            <div className='w-[100%] h-[100%] flex justify-center items-start p-10'>
                <div className="w-[25%] mx-auto flex flex-col items-start text-start">
                    <h1 className="text-uppercase mb-4 font-weight-bold  text-[40px] hover:text-[#2E5077] hover:scale-105 transition-transform duration-500">
                    Digital Wallet
                    </h1>
                    <p >
                    Manage your money effortlessly with our Digital Wallet! Enjoy secure payments, quick transfers, and exclusive rewards—all in one easy-to-use app. Stay in control of your finances anytime, anywhere.
                    </p>
                </div>
                

  
                <div className="mx-auto flex flex-col items-start text-start mt-5">
                    <h6 className="text-uppercase mb-4 font-weight-bold hover:text-[#2E5077] hover:scale-110 transition-transform duration-500">Services</h6>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a onClick={()=>navigate('/send-money')}>Send Money</a>
                    </p>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a onClick={()=>navigate('/recharge')} >Recharge&Pay</a>
                    </p>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a onClick={()=>navigate('/travel')} >Travel&Entertainment</a>
                    </p>
                    
                </div>
 

            
                <div className=" mx-auto mt-5 flex flex-col items-start text-start">
                    <h6 className="text-uppercase mb-4 font-weight-bold hover:text-[#2E5077] hover:scale-110 transition-transform duration-500">
                    Useful links
                    </h6>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a onClick={() => navigate('/wallet?activeIndex=0')} >Profile</a>
                    </p>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a onClick={() => navigate('/wallet?activeIndex=1')}>My Wallet</a>
                    </p>
                    <p className='hover:text-blue-700 cursor-pointer'>
                    <a>About</a>
                    </p>
                    
                </div>
           

                <div className="mx-auto mt-5 flex flex-col items-start text-start  ">
                    <h6 className="text-uppercase mb-4 font-weight-bold hover:text-[#2E5077] hover:scale-110 transition-transform duration-500">Contact</h6>
                    <p className='hover:text-blue-700 cursor-pointer'><i className="fas fa-home mr-3 "></i> New York, NY 10012, US</p>
                    <p className='hover:text-blue-700 cursor-pointer'><i className="fas fa-envelope mr-3 "></i> info@gmail.com</p>
                    <p className='hover:text-blue-700 cursor-pointer'><i className="fas fa-phone mr-3 "></i> + 01 234 567 88</p>
                    <p className='hover:text-blue-700 cursor-pointer'><i className="fas fa-print mr-3 "></i> + 01 234 567 89</p>
                </div>
            </div>
        

            <section className="p-3 pt-0">
                <div className=" flex justify-between  items-center mr-20 ml-20 pl-3 pr-3">
            
                    <div className="col-md-7 col-lg-8 text-center text-md-start">
                        
                        <div className="p-3 ml-10 text-start">
                        © {new Date().getFullYear()} Digital Wallet. All Rights Reserved.
                        <br />
                        <a className="m-2" href="http://localhost:5173/"
                            >www.DigitalWallet.com </a>
                        </div>
                    
                    </div>
                    

                
                    <div className=" text-center text-[20px] p-3 ">
                    
                        <a
                        className=" m-2 text-black bg-[#F6F4F0] w-max p-2 rounded-full"
                
                        role="button"
                        ><i className="fab fa-facebook-f hover:text-[#4DA1A9] hover:scale-125 transition-transform duration-500"></i>
                        </a>

                        <a
                        className=" m-2 text-black bg-[#F6F4F0] w-max p-2 rounded-full"
                       
                        role="button">
                            <i className="fab fa-twitter hover:text-[#4DA1A9] hover:scale-125 transition-transform duration-500"></i>
                        </a>

            
                        <a
                        className=" m-2 text-black bg-[#F6F4F0] w-max p-2 rounded-full"
                     
                        role="button"
                        >
                            <i className="fab fa-google hover:text-[#4DA1A9] hover:scale-125 transition-transform duration-500">
                            </i>
                        </a>

                    
                        <a
                        className=" m-2  text-black bg-[#F6F4F0] w-max p-2 rounded-full"
                      
                        role="button"
                        >
                            <i className="fab fa-instagram hover:text-[#4DA1A9] hover:scale-125 transition-transform duration-500"></i>
                        </a>
                    </div>
                
                </div>
            </section>
        </footer>
        
    </div>
    )
}

export default Footer