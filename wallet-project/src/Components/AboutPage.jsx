import React from "react";
import Navheader from "./Navheader";
import OurVision from "../assets/OurVision.svg";
import Offer from "../assets/Offer.svg";
import Choose from "../assets/Choose.svg";

function AboutPage(){
    return(
        <div>
            <Navheader />
            <About/>
        </div>
    )
}
export default AboutPage




function About() {
  return (
    <div className="w-[80%] h-auto bg-white text-black p-10 m-auto flex flex-col items-center justify-center ">
      <div className="w-[100%] mx-auto">
        {/* Header */}
        <h1 className="text-[60px] font-bold text-left mb-6 text-[#2E5077] ">About Us</h1>

        {/* Section: Introduction */}
        <section className=" mb-20 flex items-center  justify-center ">
            
            <div className=" p-10 w-[40%] hover:scale-110 transition-transform duration-500">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-lg w-[80%]">
                    Welcome to <span className="font-bold text-blue-600">Digital Wallet</span>, 
                    the ultimate solution for effortless money management. We aim to revolutionize 
                    how you handle finances by offering a secure, intuitive, and feature-rich digital wallet.
                </p>
            </div>
            <img src={OurVision} className=" w-[700px] h-[400px]" alt="" />
        </section>

        {/* Section: Features */}
        <section className="mb-20 flex items-center  justify-center">
            <img src={Offer} alt="" />
            <div className="p-10 w-[60%] hover:scale-110 transition-transform duration-500">
                <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                <ul className="list-disc list-inside space-y-2 text-lg">
                    <li>
                    <span className="font-bold text-blue-600">Send Money:</span> Transfer funds instantly 
                    to your family, friends, or colleagues.
                    </li>
                    <li>
                    <span className="font-bold text-blue-600">Recharge & Pay:</span> Pay bills and recharge 
                    your phone with just a few clicks.
                    </li>
                    <li>
                    <span className="font-bold text-blue-600">Travel & Entertainment:</span> Book tickets, 
                    plan trips, and enjoy exclusive discounts.
                    </li>
                    <li>
                    <span className="font-bold text-blue-600">Secure Transactions:</span> We prioritize 
                    your security with advanced encryption and fraud prevention measures.
                    </li>
                </ul>
            </div>
            
        </section>

        {/* Section: Why Choose Us */}
        <section className="mb-20 flex items-center  justify-center">
          <div className="p-10 w-[60%] hover:scale-110 transition-transform duration-500">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Digital Wallet?</h2>
            <p className="text-lg leading-relaxed">
                We provide a seamless user experience backed by cutting-edge technology. 
                Our platform ensures fast, reliable, and secure financial operations, 
                giving you peace of mind while managing your money.
            </p>
          </div>
          <img src={Choose} alt="" />
        </section>

        {/* Section: Contact Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="text-lg">
            Have questions or need support? Reach out to us at:
          </p>
          <ul className="list-none mt-4 space-y-2 text-lg">
            <li><i className="fas fa-envelope text-blue-600"></i> Email: support@digitalwallet.com</li>
            <li><i className="fas fa-phone text-blue-600"></i> Phone: +1 234-567-890</li>
            <li><i className="fas fa-map-marker-alt text-blue-600"></i> Address:DLF Cyber City
                Building 10, Tower A
                DLF Phase 2, Sector 24
                Gurugram, Haryana 122002
                India</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 mt-10">
          © {new Date().getFullYear()} Digital Wallet. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

