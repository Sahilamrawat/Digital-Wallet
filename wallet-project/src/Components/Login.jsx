import React, { useState } from 'react';
import "./Styles.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import login_logo from "../assets/login_logo.svg"
import { ToastContainer } from 'react-toastify';
import {handleSuccess, handleError } from '../utils';
function Login() {
    const [formData, setFormData] = useState({
        
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...formData };
        copyLoginInfo[name] = value;
        setFormData(copyLoginInfo);// Clear error on input change
    };

 

    const handleSubmit =async (e) => {
        e.preventDefault();
        const {email,password}= formData;
        if(!email || !password){
            return handleError('Fields are required')
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            const { success, message, jwtToken, userName, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', userName);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
        // if (validateForm()) {
        //     // Proceed with login

        //     alert("Login successful!");
        //     navigate("/"); // Navigate to the home page
        // }
    };

    return (
        <div className="page-container bg-[#F6F4F0] flex items-center justify-center w-screen h-screen">
            <div className='outer-container flex w-[50%] justify-center items-center bg-white rounded-lg'>
                <img src={login_logo} className='login-logo w-[45%] bg-white ' alt="image" />
                <div className="form-container flex flex-col items-center justify-center w-[100%] bg-[#4DA1A9] rounded-lg">
                    <form
                        className="login-page flex flex-col items-center justify-center w-[80%] pt-[10px] mt-10 mb-10"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <img
                            className="logo cursor-pointer w-20 h-15 rounded-lg"
                            onClick={() => navigate("/")}
                            src={logo}
                            alt=""
                        />
                        <h1 className="font-bold text-[20px] text-white pt-2 pb-4">DIGITAL WALLET</h1>
                        <h1 className="font-bold text-[20px] text-white mb-3">Login</h1>


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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="login-btn bg-[#2E5077] rounded-md py-1 px-3 mt-5 mb-5 text-white hover:bg-[#2e5077e5] hover:scale-105 transition-transform duration-200 "
                        >
                            Login
                        </button>
                        <p>
                            Don't have an account?
                        </p>
                        <div className='sign-up cursor-pointer underline hover:scale-105 transition-transform duration-200 rounded-md py-1 px-2 text-black' onClick={()=> navigate('/signup')}>
                            Sign Up
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
            
        </div>
    );
}

export default Login;
