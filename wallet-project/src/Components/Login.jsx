import React, { useState } from 'react';
import "./Styles.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import login_logo from "../assets/login_logo.svg"
function Login() {
    const [formData, setFormData] = useState({
        
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error on input change
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with login
            alert("Login successful!");
            navigate("/"); // Navigate to the home page
        }
    };

    return (
        <div className="page-container bg-[#F6F4F0] flex items-center justify-center w-screen h-screen">
            <img src={login_logo} className='login-logo w-[400px] h-[400px] mr-10 ' alt="image" />
            <div className="form-container flex flex-col items-center justify-center w-[25%] bg-[#4DA1A9] rounded-lg">
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
                        className="login-btn bg-[#2E5077] rounded-md py-2 px-5 mt-5 mb-5 text-white"
                    >
                        Login
                    </button>
                    <p>
                        Don't have an account?
                    </p>
                    <div className='sign-up cursor-pointer hover:bg-[#2E5077] rounded-sm py-1 px-2 text-white' onClick={()=> navigate('/signup')}>
                        Sign Up
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
