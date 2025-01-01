import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../assets/user.svg';
import './Styles.css'




var upiId='';
function Profile() {
    const [profilePic, setProfilePic] = useState(() => {
        return localStorage.getItem('profilePic') || null;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isDobEditing, setIsDobEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [userDetails, setUserDetails] = useState(() => {
        const savedUserDetails = localStorage.getItem('userDetails');
        return savedUserDetails
            ? JSON.parse(savedUserDetails)
            : {
                  userName: '',
                  email: '',
                  phone: '',
                  dob: '',
                  kycStatus: '',
                  
              };
    });
    

    const [userAddress, setUserAddress] = useState(() => {
        const savedUserAddress = localStorage.getItem('userAddress');
        return savedUserAddress
            ? JSON.parse(savedUserAddress)
            : {
                  city: '',
                  Street: '',
                  State: '',
                  ZIP: '',
              };
    });


    const handleSaveProfile = async () => {
        // Create the updatedData object, only adding fields that are not undefined
        const updatedData = {};
    
        // Only add userName if it is defined
        if (userDetails.userName !== undefined) {
            updatedData.userName = userDetails.userName;
        }
    
        // Only add email if it is defined
        if (userDetails.email !== undefined) {
            updatedData.email = userDetails.email;
        }
    
        // Only add phone if it is defined
        if (userDetails.phone !== undefined) {
            updatedData.phone = userDetails.phone;
        }
    
        // Only add dob if it is defined
        if (userDetails.dob !== undefined) {
            updatedData.dob = userDetails.dob;
        }
    
       
        // Only add address if it is defined
        if (userAddress !== undefined) {
            updatedData.address = userAddress;
        }
        
    
        // Log the updatedData to check if all the fields are correctly added
        console.log("updatedData to send:", updatedData);
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authentication token is missing.");
                return;
            }
    
            const response = await axios.put('http://localhost:8080/auth/updateProfile', updatedData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            if (response.data.success) {
                // Save the updated user profile to local storage
                localStorage.setItem('userDetails', JSON.stringify(response.data.user));
                
                localStorage.setItem('userAddress', JSON.stringify(response.data.user.address));
                alert("Profile updated successfully");
            }
        } catch (err) {
            console.error("Error response:", err.response);
            alert("Error updating profile: " + (err.response ? err.response.data.message : err.message));
        }
    };
    









    // Fetching the profile data from the server
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token'); // Get token from localStorage

            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:8080/auth/getProfile',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data.user);
                upiId=(response.data.user.wallet.UpiId);
                setUserAddress(response.data.user.address); // Assuming address is inside the user object
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching profile');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on component mount

    useEffect(() => {
        // Save userDetails to localStorage whenever it changes
        if (userDetails) {
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
    }, [userDetails]); // Runs when userDetails changes

    useEffect(() => {
        // Save userAddress to localStorage whenever it changes
        if (userAddress) {
            localStorage.setItem('userAddress', JSON.stringify(userAddress));
        }
    }, [userAddress]); // Runs when userAddress changes

    // Loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handle profile picture change
    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0]; // The selected file
    
        if (file) {
            const formData = new FormData();
            formData.append("profilePic", file); // Append the file to FormData
    
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Authentication token is missing.");
                    return;
                }
    
                const response = await axios.post(
                    "http://localhost:8080/auth/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`, // Pass authentication token
                        },
                    }
                );
    
                if (response.data.success) {
                    console.log("Uploaded file path:", response.data.filePath);
                    alert("Profile picture uploaded successfully");
                }
            } catch (error) {
                console.error("Error uploading file:", error.response || error);
                alert("Failed to upload profile picture.");
            }
        }
    };

    const handleRemoveProfilePic = () => {
        setProfilePic(null); // Clear the profile picture
        // handleSaveProfile(null); // Save the profile with no picture
    };
    // Toggle editing states
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        
    };

    const handlePhoneEditToggle = () => {
        setIsPhoneEditing(!isPhoneEditing);
    };

    const handleDobEditToggle = () => {
        setIsDobEditing(!isDobEditing);
    };

    const handleAddressEditToggle = () => {
        setIsAddressEditing(!isAddressEditing);
    };

    // Handle user details change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle address change
    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setUserAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };


    const getProfilePicUrl = () => {
        if (profilePic) {
            try {
                return URL.createObjectURL(profilePic); // Create URL only if profilePic is valid
            } catch (error) {
                console.error('Error creating object URL for profile picture:', error);
                return 'https://via.placeholder.com/150'; // Fallback to placeholder if error occurs
            }
        }
        return 'https://via.placeholder.com/150'; // Fallback to placeholder
    };
    return (
        <div className="main-profile   bg-gray-100 w-[80%] overflow-y-scroll rounded-xl text-center flex flex-col items-center flex-grow py-2">
            
            <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] bg-white mt-[25px] flex flex-col p-4 justify-between items-start relative">
                <div className='flex justify-between w-full'>
                <h1 className='text-[25px] font-bold uppercase'>Personnel Details</h1>
                <div className='Edit-btn'>
                    <button
                        className={`text-white px-6 py-2 rounded-lg ${
                            isEditing
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-800 hover:bg-blue-900'
                        }`}
                        onClick={() => {
                            handleEditToggle(); // Toggle the edit mode first
                            if (isEditing) {
                                handleSaveProfile(); // Only call handleSaveProfile if isEditing is true (Save button)
                            }
                        }}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
                </div>
                
                <div className=' w-full flex   items-center relative'>
                    <div className='contain-content ml-4 mr-[350px]'>
                        <div className='profile-image  '>
                        <img
                            src={user}
                            alt="Profile"
                            className="rounded-full w-32 h-32 object-cover border-1 border-gray-300"
                            // name="profilePic"
                        />

                        {/* Upload and Remove Profile Picture Operations
                        <div className="mt-4">
                            <button
                                className="text-white px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700"
                                onClick={() => document.getElementById('profile-pic-input').click()}
                            >
                                Upload
                            </button>
                            <input
                                id="profile-pic-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePicChange}
                            />
                            <button
                                className="text-white px-2 py-1 ml-2 rounded-md bg-red-600 hover:bg-red-700"
                                onClick={handleRemoveProfilePic}
                            >
                                Remove
                            </button>
                        </div> */}

                            
                        </div>
                    </div>
                    
                    <div className='m-3 p-2 text-[18px]'>
                        <h2 className='font-bold '>Name</h2>
                        <div className="font-thin mb-2">
                        {isEditing ? (
                            <input
                                type="text"
                                name="userName"
                                value={userDetails.userName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2   w-full"
                            />
                        ) : (
                            <p>{userDetails.userName}</p>
                        )}
                        </div>
                      
                        <h2 className='font-bold '>Email</h2>
                        <div className="font-thin mb-2">
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <p>{userDetails.email}</p>
                        )}
                        </div>
                        
                        <h2 className='font-bold '>Status</h2>
                        <div className="font-thin">
                        {isEditing ? (
                            <input
                                type="text"
                                name="kycStatus"
                                value={userDetails.kycStatus}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <p>{userDetails.kycStatus}</p>
                        )}
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
                
            <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] bg-white mt-[25px] flex flex-col p-4 justify-between items-start relative">
                <div className='flex justify-between w-full'>
                    <h1 className='text-[25px] font-bold uppercase'>Phone</h1>
                    <div className='Edit-btn'>
                        <button
                            className={`text-white px-6 py-2 rounded-lg ${
                                isPhoneEditing
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-800 hover:bg-blue-900'
                            }`}
                            onClick={() => {
                                handlePhoneEditToggle();
                                if (isPhoneEditing) {
                                    handleSaveProfile(); // Only call handleSaveProfile if isPhoneEditing is true (Save button)
                                }
                            }}
                        >
                            {isPhoneEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
                
                <div className=' w-full flex p-4 justify-between items-center relative'>
                    <div className='m-3 p-2 text-[18px] flex '>
                        <h2 className='font-bold  mr-4'>Mobile-No:</h2>
                        <div className="font-thin">
                            {isPhoneEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userDetails.phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p>{userDetails.phone}</p>
                            )}
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] bg-white mt-[25px] flex flex-col p-4 justify-between items-start relative">
                <div className='flex justify-between w-full'>
                    <h1 className='text-[25px] font-bold uppercase'>DOB</h1>
                    <div className='Edit-btn'>
                        <button
                            className={`text-white px-6 py-2 rounded-lg ${
                                isDobEditing
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-800 hover:bg-blue-900'
                            }`}
                            onClick={() => {
                                handleDobEditToggle(); 
                                if (isDobEditing) {
                                    handleSaveProfile(); // Only call handleSaveProfile if isDobEditing is true (Save button)
                                }
                            }}
                        >
                            {isDobEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
                
                <div className=' w-full flex p-4 justify-between items-center relative'>
                    <div className='m-3 p-2 text-[18px] flex '>
                        <h2 className='font-bold  mr-4'>Birth-Date:</h2>
                        <div className="font-thin">
                            {isDobEditing ? (
                                <input
                                    type="date"
                                    name="dob"
                                    value={userDetails.dob}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p>{userDetails.dob}</p>
                            )}
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] bg-white mt-[25px]  flex flex-col p-4 justify-between items-start relative">
                <div className='flex justify-between w-full'>
                    <h1 className='text-[25px] font-bold uppercase'>Address</h1>
                    <div className='Edit-btn'>
                        <button
                            className={`text-white px-6 py-2 rounded-lg ${
                                isAddressEditing
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-blue-800 hover:bg-blue-900'
                            }`}
                            onClick={() => {
                                handleAddressEditToggle(); 
                                if (isAddressEditing) {
                                    handleSaveProfile(); // Only call handleSaveProfile if isAddressEditing is true (Save button)
                                }
                            }}
                        >
                            {isAddressEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
                
                <div className=' w-full flex p-4 justify-between items-center relative'>
                    <div className='flex flex-col'>
                        <div className='m-3 p-2 text-[18px] flex '>
                            <h2 className='font-bold mr-4'>Street:</h2>
                            <div className="font-thin">
                                {isAddressEditing ? (
                                    <input
                                        type="text"
                                        name="Street"
                                        value={userAddress.Street}
                                        onChange={handleAddressChange}
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <p>{userAddress.Street}</p>
                                )}
                            </div>
                        </div>
                        <div className='m-3 p-2 text-[18px] flex '>
                            <h2 className='font-bold  mr-4'>City:</h2>
                            <div className="font-thin">
                                {isAddressEditing ? (
                                    <input
                                        type="text"
                                        name="city"
                                        value={userAddress.city}
                                        onChange={handleAddressChange}
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <p>{userAddress.city}</p>
                                )}
                            </div>
                        </div>
                        <div className='m-3 p-2 text-[18px] flex '>
                            <h2 className='font-bold mr-4'>State:</h2>
                            <div className="font-thin">
                                {isAddressEditing ? (
                                    <input
                                        type="text"
                                        name="State"
                                        value={userAddress.State}
                                        onChange={handleAddressChange}
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <p>{userAddress.State}</p>
                                )}
                            </div>
                        </div>
                        <div className='m-3 p-2 text-[18px] flex '>
                            <h2 className='font-bold  mr-4'>ZIP:</h2>
                            <div className="font-thin">
                                {isAddressEditing ? (
                                    <input
                                        type="text"
                                        name="ZIP"
                                        value={userAddress.ZIP}
                                        onChange={handleAddressChange}
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <p>{userAddress.ZIP}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
            <ManageUpi/>

            
        </div>
    );
}

export default Profile;

function ProfileOperation({ profilePic, handleProfilePicChange, handleRemoveProfilePic }) {
    return (
        <div className="profile-btn absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 opacity-0 hover:opacity-100 rounded-full text-[10px]">
            <input
                type="file"
                id="profile-pic-input"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
            />
            <button
                className="text-white px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700"
                onClick={() => document.getElementById('profile-pic-input').click()}
            >
                Upload
            </button>
            {profilePic && (
                <button
                    className="text-white px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 mt-1"
                    onClick={handleRemoveProfilePic}
                >
                    Remove
                </button>
            )}
        </div>
    );
}
const ManageUpi = () => {
    const [isUpiEditing, setIsUpiEditing] = useState(false);
    const [newUpiId, setNewUpiId] = useState(upiId);

 
    const handleSaveProfile = async () => {
        const updatedData = {};

        // Ensure UPI ID is added to the update data
        if (upiId !== undefined) {
            updatedData.wallet = { UpiId: upiId };
            console.log("upi:",updatedData.wallet.UpiId);
        }

        console.log("updatedData to send:", updatedData);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authentication token is missing.");
                return;
            }

            const response = await axios.put('http://localhost:8080/auth/updateProfile', updatedData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                upiId = response.data.user.wallet.UpiId;
                localStorage.setItem('userWalletUpi', JSON.stringify(upiId));
                alert("Profile updated successfully");
            }
        } catch (err) {
            console.error("Error response:", err.response);
            alert("Error updating profile: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleUpiEditToggle = () => {
        if (isUpiEditing) {
            // Save the updated UPI ID before exiting edit mode
            upiId = newUpiId.trim(); // Update the global variable
            handleSaveProfile();
        }
        setIsUpiEditing((prev) => !prev); // Toggle the edit mode
    };

    const handleNewUpiChange = (e) => {
        setNewUpiId(e.target.value);
    };

    useEffect(() => {
        const storedUpiId = JSON.parse(localStorage.getItem('userWalletUpi'));
        if (storedUpiId) {
            upiId = storedUpiId;
            setNewUpiId(storedUpiId);
        }
    }, []);

    return (
        <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] mb-[25px] bg-white mt-[25px] flex flex-col p-4 justify-between items-start relative">
            <div className="flex justify-between w-full">
                <h1 className="text-[25px] font-bold uppercase">Manage UPI ID</h1>
                <div className="Edit-btn">
                    <button
                        className={`text-white px-6 py-2 rounded-lg ${
                            isUpiEditing
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-800 hover:bg-blue-900'
                        }`}
                        onClick={handleUpiEditToggle}
                    >
                        {isUpiEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col p-4 justify-between items-start relative">
                <h2 className="text-[18px] font-bold font-serif mb-2">Your UPI ID:</h2>
                {isUpiEditing ? (
                    <input
                        type="text"
                        value={newUpiId}
                        onChange={handleNewUpiChange}
                        placeholder="Enter UPI ID"
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                ) : (
                    <p className="text-gray-800">{upiId || 'No UPI ID set yet.'}</p>
                )}
            </div>
        </div>
    );
};
