import React, { useState } from 'react';
import "./Styles.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.dob.trim()) newErrors.dob = "Date of birth is required.";
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
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with signup
            alert("Signup successful!");
            navigate("/login"); // Navigate to the login page
        }
    };

    return (
        <div className="page-container flex items-center justify-center w-screen h-screen">
            <div className="form-container flex flex-col items-center justify-center w-[35%] bg-[#4DA1A9] rounded-lg">
                <form
                    className="signup-page flex flex-col items-center justify-center w-[80%] pt-[10px] mt-10 mb-10"
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
                    <h1 className="font-bold text-[20px] text-white mb-3">Signup</h1>

                    {/* First Name and Last Name Fields */}
                    <div className="flex w-full justify-center items-center space-x-2">
                        <input
                            className={`input-fields flex-grow ${errors.firstName ? "border-red-500" : ""}`}
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <input
                            className={`input-fields flex-grow ${errors.lastName ? "border-red-500" : ""}`}
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}

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
                        className="signup-btn bg-[#2E5077] rounded-md py-2 px-5 mt-5 mb-5 text-white"
                    >
                        Signup
                    </button>
                    <p>
                        Already have an account?{" "}
                        <span
                            className="cursor-pointer text-white underline"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
