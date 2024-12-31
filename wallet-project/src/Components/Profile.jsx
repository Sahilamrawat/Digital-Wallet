import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                localStorage.setItem('profilePic', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfilePic = () => {
        setProfilePic(null);
        localStorage.removeItem('profilePic');
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

    return (
        <div className="main-profile bg-gray-100 w-[80%] overflow-y-scroll rounded-xl text-center flex flex-col items-center flex-grow py-2">
            
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
                                src={profilePic || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className=" rounded-full w-32 h-32 object-cover border-1 border-gray-300"
                                
                            />
                            
                            <ProfileOperation
                                profilePic={profilePic}
                                handleProfilePicChange={handleProfilePicChange}
                                handleRemoveProfilePic={handleRemoveProfilePic}
                            />
                            
                        </div>
                    </div>
                    
                    <div className='m-3 p-2 text-[18px]'>
                        <h1 className='font-bold font-serif'>Name</h1>
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
                      
                        <h1 className='font-bold font-serif'>Email</h1>
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
                        
                        <h1 className='font-bold font-serif'>Status</h1>
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
                        <h1 className='font-bold font-serif mr-4'>Mobile-No:</h1>
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
                        <h1 className='font-bold font-serif mr-4'>Birth-Date:</h1>
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
                            <h1 className='font-bold font-serif mr-4'>Street:</h1>
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
                            <h1 className='font-bold font-serif mr-4'>City:</h1>
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
                            <h1 className='font-bold font-serif mr-4'>State:</h1>
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
                            <h1 className='font-bold font-serif mr-4'>ZIP:</h1>
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
    const [userDetails, setUserDetails] = useState(() => {
        const savedUserDetails = localStorage.getItem('userDetails');
        return savedUserDetails
            ? { ...JSON.parse(savedUserDetails), UpiList: JSON.parse(savedUserDetails).UpiList || [] }
            : {
                  name: '',
                  email: '',
                  phone: '',
                  dob: '',
                  kycStatus: '',
                  UpiList: [], // Initialize as an empty array
              };
    });
    const [newUpi, setNewUpi] = useState(""); // Temporary state for new UPI input

    // Handle toggling between edit/create mode
    const handleUpiEditToggle = () => {
        if (isUpiEditing) {
            if (newUpi.trim()) {
                // Limit to 3 UPI IDs
                if (userDetails.UpiList.length >= 1) {
                    alert("You can only add up to 1 UPI IDs.");
                    setIsUpiEditing(false);
                    return;
                }
                // Add new UPI ID to the list
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    UpiList: [...prevDetails.UpiList, newUpi.trim()],
                }));
                setNewUpi(""); // Clear input field
            }
        }
        setIsUpiEditing((prev) => !prev);
    };


    // Handle UPI input change
    const handleNewUpiChange = (e) => {
        setNewUpi(e.target.value);
    };

    // Handle removing an existing UPI ID
    const handleRemoveUpi = (index) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            UpiList: prevDetails.UpiList.filter((_, i) => i !== index),
        }));
    };

    useEffect(() => {
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        

    }, [userDetails]);

    return (
        <div className="Profile-display shadow-md rounded-xl pb-4 w-[95%] mb-[25px] bg-white mt-[25px] flex flex-col p-4 justify-between items-start relative">
            
            <div className="flex justify-between w-full">
                <h1 className="text-[25px] font-bold uppercase">Manage UPI IDs</h1>
                <div className="Edit-btn">
                    <button
                        className={`text-white px-6 py-2 rounded-lg ${
                            isUpiEditing
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-blue-800 hover:bg-blue-900"
                        }`}
                        onClick={handleUpiEditToggle }
                    >
                        {isUpiEditing ? "Save New" : "Create"}
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col p-4 justify-between items-start relative">
                <h2 className="text-[18px] font-bold font-serif mb-2">Your UPI IDs:</h2>
                {Array.isArray(userDetails.UpiList) && userDetails.UpiList.length > 0 ? (
                    userDetails.UpiList.map((upi, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center w-full border-b-2 border-gray-300 rounded  py-2"
                        >
                            <p className="font-thin">{upi}</p>
                            <button
                                className="text-red-500 hover:underline text-sm"
                                onClick={() => handleRemoveUpi(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No UPI IDs added yet.</p>
                    
                )}
            </div>

            {isUpiEditing && userDetails.UpiList.length < 3 && (
                <div className="w-full mt-4">
                    <input
                        type="text"
                        value={newUpi}
                        onChange={handleNewUpiChange}
                        placeholder="Enter new UPI ID"
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                </div>
            )}

            {userDetails.UpiList.length >= 3 && (
                <p className="text-red-500 mt-2">Maximum limit of 1 UPI IDs reached.</p>
            )}
            
        </div>
    );
};



