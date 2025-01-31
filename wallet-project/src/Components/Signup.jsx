import React, { useState } from 'react';
import "./Styles.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import signup from "../assets/sign-up.svg"; 
import { ToastContainer } from 'react-toastify';
import {handleSuccess, handleError } from '../utils';
// import AllUsers from "../Data/users"

function Signup() {
    const [formData, setFormData] = useState({
        userName: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone:"",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error on input change
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, email, password, dob, confirmPassword ,phone } = formData;
    
        if (!userName || !email || !password || !dob || !confirmPassword||!phone) {
            return handleError("All fields are required.");
        }
    
        // Ensure dob is in ISO format
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
        if (!dobRegex.test(dob)) {
            return handleError("Invalid date of birth format. Please use YYYY-MM-DD.");
        }
    
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, dob }), // Send dob as is
            });
    
            const result = await response.json();
            const { success, message, error } = result;
    
            if (success) {
                handleSuccess(message);
                
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || "An error occurred.";
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError("Failed to submit the form. Please try again.");
        }
    };
    

    return (
        <div className="page-container flex items-center justify-center w-screen h-screen">
            <div className='outer-container flex w-[65%] justify-center items-center bg-white rounded-lg'>
                <img src={signup} className='login-logo w-[45%]  bg-white ' alt="image" />
                <div className="form-container flex flex-col items-center justify-center w-[100%] bg-[#4DA1A9] rounded-lg">
                    <form
                        className="signup-page flex flex-col items-center justify-center w-[80%] pt-[10px] mt-10 mb-10"
                    
                        onSubmit={handleSubmit}
                    >
                        <img
                            className="logo cursor-pointer w-20 h-15 rounded-lg"
                            onClick={() => navigate("/")}
                            src={logo}
                            alt=""
                        />
                        <h1 className="font-bold text-[20px] text-white pt-2 pb-4">DIGITAL WALLET</h1>
                        <h1 className="font-bold text-[20px] text-white mb-3">Signup</h1>

                        {/* First Name and Last Name Fields */}
                        
                        <input
                                className={`input-fields flex-grow ${errors.userName ? "border-red-500" : ""}`}
                                type="text"
                                name="userName"
                                placeholder="Username"
                                value={formData.userName}
                                onChange={handleInputChange}
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                        

                        {/* Date of Birth Field */}
                        <input
                            className={`input-fields ${errors.dob ? "border-red-500" : ""}`}
                            type="date"
                            name="dob"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}

                        {/* Email Field */}
                        <input
                            className={`input-fields ${errors.email ? "border-red-500" : ""}`}
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                        <input
                            className={`input-fields ${errors.phone ? "border-red-500" : ""}`}
                            type="tel"
                            name="phone"
                            placeholder="Mobile No"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

                        {/* Password Field */}
                        <input
                            className={`input-fields ${errors.password ? "border-red-500" : ""}`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                        {/* Confirm Password Field */}
                        <input
                            className={`input-fields ${errors.confirmPassword ? "border-red-500" : ""}`}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="signup-btn bg-[#2E5077] rounded-md py-1 px-3 mt-5 mb-5 hover:bg-[#2e5077e5] hover:scale-105 transition-transform duration-200 text-white"
                        >
                            Signup
                        </button>
                        <p>
                            Already have an account?{" "}
                            
                        </p>
                        <div
                            className="cursor-pointer text-black underline
                            hover:scale-105 transition-transform duration-200 rounded-md py-1 px-2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </div>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
}

export default Signup;
