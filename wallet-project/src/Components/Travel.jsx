import React, { useState, useRef } from 'react';
import Navheader from './Navheader';
import AvengerEndgame from '../assets/AvengerEndgame.jpeg';
import Avatar from '../assets/Avatar.jpeg';
import pushpa from '../assets/pushpa.jpeg';
import CaptainMarvel from '../assets/CaptainMarvel.jpeg';
import mulan from '../assets/mulan.jpeg';
import blackAdam from '../assets/blackAdam.jpeg';
import MovieBooking from '../assets/MovieBooking.svg';
import FlightBooking from '../assets/FlightBooking.svg'; 
import BusBooking from '../assets/BusBooking.svg';
import TrainBooking from '../assets/TrainBooking.svg';
import MetroBooking from '../assets/MetroBooking.svg';
import HotelBooking from '../assets/HotelBooking.svg';
import './Styles.css';
const busSchedules = [
    {
        busOperator: "Volvo Bus Services",
        departure: "Delhi 10:00 AM",
        arrival: "Mumbai 8:00 PM",
        busType: "AC Sleeper",
        stops: 3,
        price: "₹1500"
    },
    {
        busOperator: "Shree Travels",
        departure: "Delhi 5:00 PM",
        arrival: "Mumbai 3:00 AM",
        busType: "Non-AC",
        stops: 2,
        price: "₹800"
    },
    {
        busOperator: "SRS Travels",
        busType: "Non-AC",
        departure: "Chennai 10:30 AM",
        arrival: "Bangalore 4:00 PM",
        price: "₹950",
    },
    {
        busOperator: "VRL Travels",
        busType: "Sleeper",
        departure: "Bangalore 11:30 PM",
        arrival: "Goa 6:00 AM",
        price: "₹1,100",
    },
    {
        busOperator: "Orange Tours & Travels",
        busType: "AC",
        departure: "Hyderabad 9:00 AM",
        arrival: "Mumbai 6:00 PM",
        price: "₹1,450",
    },
    {
        busOperator: "KPN Travels",
        busType: "Non-AC",
        departure: "Coimbatore 5:00 PM",
        arrival: "Chennai 11:00 PM",
        price: "₹850",
    },
    {
        busOperator: "Eagle Travels",
        busType: "Sleeper",
        departure: "Bangalore 8:00 PM",
        arrival: "Chennai 5:30 AM",
        price: "₹1,000",
    },
    {
        busOperator: "Bharathi Travels",
        busType: "AC",
        departure: "Pune 8:30 AM",
        arrival: "Mumbai 10:30 AM",
        price: "₹750",
    },
    {
        busOperator: "VRL Travels",
        busType: "Sleeper",
        departure: "Mangalore 11:00 PM",
        arrival: "Mumbai 7:30 AM",
        price: "₹1,200",
    },
    {
        busOperator: "KSRTC",
        busType: "AC",
        departure: "Bangalore 9:00 AM",
        arrival: "Mysore 11:00 AM",
        price: "₹500",
    },
    {
        busOperator: "SRS Travels",
        busType: "Non-AC",
        departure: "Mumbai 10:00 AM",
        arrival: "Bangalore 7:30 PM",
        price: "₹1,050",
    },
];



const flightSchedules = [
    {
        airline: "IndiGo",
        departure: "06:00 AM",
        arrival: "08:15 AM",
        duration: "2h 15m",
        stops: "Non-Stop",
        price: "₹5,499"
    },
    {
        airline: "IndiGo",
        departure: "05:00 AM",
        arrival: "07:20 AM",
        duration: "2h 20m",
        stops: "Non-Stop",
        price: "₹5,499"
    },
    {
        airline: "IndiGo",
        departure: "11:55 PM",
        arrival: "02:15 AM (+1d)",
        duration: "2h 20m",
        stops: "Non-Stop",
        price: "₹5,499"
    },
    {
        airline: "Air India",
        departure: "07:00 AM",
        arrival: "09:10 AM",
        duration: "2h 10m",
        stops: "Non-Stop",
        price: "₹5,555"
    },
    {
        airline: "Air India",
        departure: "08:00 AM",
        arrival: "10:15 AM",
        duration: "2h 15m",
        stops: "Non-Stop",
        price: "₹5,555"
    },
    {
        airline: "Air India",
        departure: "10:30 AM",
        arrival: "12:45 PM",
        duration: "2h 15m",
        stops: "Non-Stop",
        price: "₹5,555"
    },

    
   
];

const trainSchedules = [
    {
        trainName: "Rajdhani Express",
        departureTime: "08:00 AM",
        arrivalTime: "02:00 PM",
        trainType: "Superfast",
        stops: 2,
        duration: "6h 0m",
        price: "₹1500",
    },
    {
        trainName: "Shatabdi Express",
        departureTime: "09:30 AM",
        arrivalTime: "03:00 PM",
        trainType: "Express",
        stops: 3,
        duration: "5h 30m",
        price: "₹1200",
    },
    {
        trainName: "Garib Rath Express",
        departureTime: "10:00 AM",
        arrivalTime: "06:00 PM",
        trainType: "AC 3 Tier",
        stops: 4,
        duration: "8h 0m",
        price: "₹950",
    },
    {
        trainName: "Duronto Express",
        departureTime: "07:15 AM",
        arrivalTime: "01:15 PM",
        trainType: "Non-stop",
        stops: 0,
        duration: "6h 0m",
        price: "₹1800",
    },
    {
        trainName: "Intercity Express",
        departureTime: "06:45 AM",
        arrivalTime: "11:45 AM",
        trainType: "Chair Car",
        stops: 5,
        duration: "5h 0m",
        price: "₹600",
    },
    {
        trainName: "Jan Shatabdi",
        departureTime: "03:00 PM",
        arrivalTime: "09:00 PM",
        trainType: "Sleeper",
        stops: 6,
        duration: "6h 0m",
        price: "₹700",
    },
    {
        trainName: "Sampark Kranti",
        departureTime: "11:30 PM",
        arrivalTime: "06:30 AM",
        trainType: "Express",
        stops: 3,
        duration: "7h 0m",
        price: "₹1100",
    },
];

const metroSchedules = [
    {
        metroName: "Delhi Metro",
        departureTime: "08:00 AM",
        arrivalTime: "09:00 AM",
        stops: 5,
        duration: "1h 0m",
        price: "₹50",
    },
    {
        metroName: "Mumbai Metro",
        departureTime: "09:00 AM",
        arrivalTime: "10:00 AM",
        stops: 6,
        duration: "1h 0m",
        price: "₹60",
    },
    {
        metroName: "Kolkata Metro",
        departureTime: "10:00 AM",
        arrivalTime: "11:00 AM",
        stops: 7,
        duration: "1h 0m",
        price: "₹70",
    },
    {
        metroName: "Chennai Metro",
        departureTime: "11:00 AM",
        arrivalTime: "12:00 PM",
        stops: 8,

        duration: "1h 0m",
        price: "₹80",
    },
    {
        metroName: "Bangalore Metro",
        departureTime: "12:00 PM",
        arrivalTime: "01:00 PM",
        stops: 9,
        duration: "1h 0m",
        price: "₹90",
    },
    {
        metroName: "Hyderabad Metro",
        departureTime: "01:00 PM",
        arrivalTime: "02:00 PM",
        stops: 10,
        duration: "1h 0m",
        price: "₹100",
    },
    {
        metroName: "Ahmedabad Metro",
        departureTime: "02:00 PM",
        arrivalTime: "03:00 PM",
        stops: 11,
        duration: "1h 0m",
        price: "₹110",
    },
    {
        metroName: "Pune Metro",
        departureTime: "03:00 PM",
        arrivalTime: "04:00 PM",
        stops: 12,
        duration: "1h 0m",
        price: "₹120",
    },
    {
        metroName: "Jaipur Metro",
        departureTime: "04:00 PM",

        arrivalTime: "05:00 PM",
        stops: 13,
        duration: "1h 0m",
        price: "₹130",

    },
];
const hotelRooms = [
    {
        roomName: "Deluxe Suite",
        roomType: "Suite",
        amenities: ["Free WiFi", "Breakfast", "King Bed"],
        maxGuests: 2,
        price: "₹2000 / night",
    },
    {
        roomName: "Standard Room",
        roomType: "Single",
        amenities: ["Free WiFi", "Air Conditioning"],
        maxGuests: 1,
        price: "₹1000 / night",
    },
    {
        roomName: "Family Room",
        roomType: "Family",
        amenities: ["Free WiFi", "Breakfast", "2 Queen Beds"],
        maxGuests: 4,
        price: "₹3000 / night",
    },
];

import { act } from 'react';
function Travel() {
    return (
      <div className="w-[100vw] h-[100vh] overflow-x-hidden">
        <Navheader />
        <TravelPage />
      </div>
    );
  }

export default Travel;

function TravelPage() {
    const [activeIndex, setActiveIndex] = useState(0); // Track active section

    const menuItems = [
        'Movie Tickets',
        'Flight Tickets',
        'Bus Tickets',
        'Train Tickets',
        'Metro Tickets',
        'Hotel Rooms',
    ];

    const handleItemClick = (index) => {
        setActiveIndex(index); // Set the active section
    };

    // Define the background images based on active index
    const backgroundImages = [
        MovieBooking, // Movie Tickets Background
        FlightBooking, // Flight Tickets Background
        BusBooking, // Bus Tickets Background
        TrainBooking, // Train Tickets Background
        MetroBooking, // Metro Tickets Background
        HotelBooking, // Hotel Rooms Background
    ];

    return (
        <>
            <nav className="recharge-nav-bar flex justify-evenly bg-[#4DA1A9] items-center text-white text-xl w-[100%] h-[5%]">
                {menuItems.map((item, index) => (
                    <p
                        key={index}
                        className={`cursor-pointer transition-transform duration-300 ${
                            activeIndex === index
                                ? 'text-[#2E5077] hover:text-[#2E5077] scale-105'
                                : 'hover:text-[#2E5077] hover:scale-105'
                        }`}
                        onClick={() => handleItemClick(index)} // Handle menu item click
                    >
                        {item}
                    </p>
                ))}
            </nav>

            <div
                className={`bg-cover bg-left bg-[#4DA1A9] bg-no-repeat h-[70%] w-[100%] flex flex-col items-center space-y-10 justify-center`}
                style={{
                    backgroundImage: `url(${backgroundImages[activeIndex]})`,
                    // Dynamically adjust other styles like background position or size
                    backgroundPosition: 'center',
                    backgroundSize: 'contain', // You can change this per section as needed
                }}
            >
                <div className="w-[100%] h-[30%] text-[100px] items-center justify-center flex font-mono text-white hover:scale-105 transition-transform duration-500">
                    {activeIndex === 0 && <h1>Book Movie Tickets</h1>}
                    {activeIndex === 1 && <h1>Book Flight Tickets</h1>}
                    {activeIndex === 2 && <h1>Book Bus Tickets</h1>}
                    {activeIndex === 3 && <h1>Book Train Tickets</h1>}
                    {activeIndex === 4 && <h1>Book Metro Tickets</h1>}
                    {activeIndex === 5 && <h1>Book Hotel Rooms</h1>}
                </div>

                <div>
                    {activeIndex === 1 && <FlightBookingPage />}
                </div>

                {activeIndex === 0 && (
                    <div className='w-[35%] mx-auto'>
                        <div className="relative flex items-center  w-full h-12 rounded-lg focus-within:shadow-xl shadow-lg overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-[#2E5077] bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm bg-white text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search Movies.."
                            />
                        </div>
                    </div>
                )}
                <div className='w-[70%] '>
                    {activeIndex ===2 && <BusBookingPage />}
                </div>
                <div className='w-[70%] '>
                    {activeIndex ===3 && <TrainBookingPage />}
                </div>
                <div className='w-[70%] '>
                    {activeIndex ===4 && <MetroBookingPage />}
                </div>
                <div className='w-[70%] '>
                    {activeIndex ===5 && <HotelBookingPage />}
                </div>
            </div>

            <div className="w-[100%] flex flex-col items-center justify-center">
                <div className="recharge-form-container w-[100%] h-max  p-3">
                    {activeIndex === 0 && <MovieBrowsingPage />}
                    <div className='flex justify-center p-4'>
                        {activeIndex===1&& <FlightFilters/>}
                        {activeIndex === 1 && <FlightsSchedule flightSchedules={flightSchedules} />}

                    </div>
                    <div className='flex justify-center p-4'>
                        {activeIndex===2&& <BusFilters/>}
                        {activeIndex === 2 && <BusSchedule busSchedules={busSchedules} />}

                    </div>
                    <div className='flex justify-center p-4'>
                        {activeIndex===3&& <TrainFilters/>}
                        {activeIndex === 3 && <TrainSchedule trainSchedules={trainSchedules} />}

                    </div>
                    <div className='flex justify-center p-4'>
                        {activeIndex===4&& <MetroFilters/>}
                        {activeIndex === 4 && <MetroSchedule metroSchedules={metroSchedules} />}

                    </div>
                    <div className='flex justify-center p-4'>
                        {activeIndex===5&& <HotelRoomFilters/>}
                        {activeIndex === 5 && <HotelRoomCards hotelRooms={hotelRooms} />}

                    </div>
                </div>
            </div>
        </>
    );
}

function MovieBrowsingPage() {
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Movies data array
    const movies = [
        {
            name: 'Avengers Endgame',
            description:
                'After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
            price: '₹150',
            image: AvengerEndgame,
        },
        {
            name: 'Avatar',
            description:
                'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
            price: '₹180',
            image: Avatar,
        },
        {
            name: 'Pushpa 2',
            description:
                'Pushpa Raj, a coolie, rises in the world of red sandalwood smuggling. Violence erupts between the smugglers and the cops.',
            price: '₹120',
            image: pushpa,
        },
        {
            name: 'Captain Marvel',
            description:
                'Carol Danvers becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.',
            price: '₹160',
            image: CaptainMarvel,
        },
        {
            name: 'Mulan',
            description:
                'A young Chinese maiden disguises herself as a male warrior in order to save her father. A tale of bravery and honor.',
            price: '₹140',
            image: mulan,
        },
        {
            name: 'Black Adam',
            description:
                'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods, Black Adam is freed from his tomb.',
            price: '₹200',
            image: blackAdam,
        },
    ];

    const handleBookNowClick = (movie) => {
        setSelectedMovie(movie); // Set the selected movie for booking
    };

    const closeOverlay = () => {
        setSelectedMovie(null); // Clear the selected movie to hide the overlay
    };
    var ticketPrice = 0;

    return (
        <>
            {/* Movie Cards */}
            <div>
                <div className="movie-cards-container w-full h-full grid grid-cols-6 gap-4 p-2">
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="card flex flex-col items-center justify-center rounded-lg hover:shadow-lg p-4 transition-transform transform hover:scale-105"
                        >
                            <img
                                src={movie.image}
                                className="w-[200px] h-[250px] mt-5 rounded-lg"
                                alt={movie.name}
                            />
                            <div className="card-info mt-4 text-center text-lg font-semibold">
                                <h2>{movie.name}</h2>
                                <p>Action, Adventure, Sci-Fi</p>
                            </div>
                            <div className="card-btn mt-4">
                                <button
                                    className="bg-[#2E5077] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
                                    onClick={() => handleBookNowClick(movie)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overlay for Selected Movie */}
                {selectedMovie && (
                    
                    <div className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        
                        <div className="overlay-content bg-white p-6 rounded-lg shadow-lg w-[60%] h-[80%] relative flex ">
                            {/* Movie Details (Left) */}
                            <div className="movie-image w-[50%] p-4">
                                <img
                                    src={selectedMovie.image}
                                    className="w-[400px] h-[450px] mt-10 rounded-lg"
                                    alt={selectedMovie.name}
                                />
                                <h2 className="text-xl font-semibold mt-4">{selectedMovie.name}</h2>
                                <p className="text-gray-600 mt-2">{selectedMovie.description}</p>
                                <p className="text-2xl text-[#2E5077] font-bold mt-4">Ticket Price: {selectedMovie.price}</p>
                            </div>

                            {/* Booking Form (Right) */}
                            <div className="movie-details w-[50%] p-1">
                                

                                {/* Booking Form */}
                                <h3 className="text-2xl font-bold text-center mb-4">Book Tickets for {selectedMovie.name} </h3>
                                <div className="booking-form">
                                    <div className="mb-4">
                                        <label className="block text-lg font-semibold mb-2" htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your name"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg font-semibold mb-2" htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg font-semibold mb-2" htmlFor="phone">Phone Number</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Enter your phone number"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="UpiId" className="block text-lg font-semibold mb-2">
                                            UPI Id
                                        </label>
                                        <input
                                            type="text"
                                            id="UpiId"
                                            name="UpiId"
                                            value={localStorage.getItem('userWalletUpi').replace(/^"(.*)"$/, "$1")}
                                            disabled
                                            placeholder="Enter your UPI Id"
                                            className="w-full p-3 border-2 rounded-lg outline-none focus:ring-2 focus:ring-[#4DA1A9] text-[#2E5077]"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg font-semibold mb-2" htmlFor="tickets">Number of Tickets</label>
                                        <input
                                            type="number"
                                            id="tickets"
                                            placeholder="How many tickets?"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            {...ticketPrice}
                                        
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-lg font-semibold mb-2" htmlFor="payment">Payment Method</label>
                                        <select
                                            id="payment"
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                        >
                                            <option value="credit-card">Credit Card</option>
                                            <option value="debit-card">Debit Card</option>
                                            <option value="upi">UPI</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            className="mt-6 bg-[#2E5077] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
                                            onClick={closeOverlay}
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                                onClick={closeOverlay}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}






function FlightBookingPage() {
    const [isSearching, setIsSearching] = useState(false); // State to track if the search button was clicked

    // Example flight schedules (you can replace this with dynamic data)
    
    
    const handleSearchClick = () => {
        setIsSearching(true); // Set isSearching to true when the search button is clicked
    };

    return (
        <>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-evenly space-x-4">
                    {/* One Way / Round Trip */}
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-1">
                            <input type="radio" name="trip" defaultChecked />
                            <span className="text-gray-700">One Way</span>
                        </label>
                        <label className="flex items-center space-x-1">
                            <input type="radio" name="trip" />
                            <span className="text-gray-700">Round Trip</span>
                        </label>
                    </div>

                    {/* From and To Locations */}
                    <div className="flex items-center space-x-6">
                        <div>
                            <label className="block text-sm text-gray-500">From</label>
                            <input
                                type="text"
                                placeholder="DEL"
                                className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                            />
                            <p className="text-sm text-gray-400">Delhi</p>
                        </div>
                        <span className="text-2xl text-gray-500">↔</span>
                        <div>
                            <label className="block text-sm text-gray-500">To</label>
                            <input
                                type="text"
                                placeholder="BOM"
                                className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                            />
                            <p className="text-sm text-gray-400">Mumbai, Maharashtra</p>
                        </div>
                    </div>

                    {/* Departure Date */}
                    <div>
                        <label className="block text-sm text-gray-500">Departure Date</label>
                        <input
                            type="date"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        />
                        <p className="text-sm text-gray-400">Save More</p>
                    </div>

                    {/* Add Return */}
                    <div>
                        <label className="block text-sm text-gray-500">&nbsp;</label>
                        <p className="text-blue-500 cursor-pointer hover:underline text-lg">+ Add Return</p>
                    </div>

                    {/* Travellers & Cabin Class */}
                    <div>
                        <label className="block text-sm text-gray-500">Travellers & Cabin Class</label>
                        <input
                            type="text"
                            placeholder="1 Traveller"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        />
                        <p className="text-sm text-gray-400">Economy</p>
                    </div>

                    {/* Search Button */}
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
                        onClick={handleSearchClick} // Handle search button click
                    >
                        Search Flights
                    </button>
                </div>

                {/* Special Fares */}
                <div className="flex justify-center space-x-4 mt-4">
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Armed Forces
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Student
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Senior Citizen
                    </button>
                </div>
            </div>

        {/* Conditional rendering for flight schedule */}

        </>
    );
}

function FlightsSchedule({ flightSchedules }) {
    return (
        <div className="mt-6 w-[60%]  bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Flight Schedules</h3>
            <div className="mt-4 space-y-4">
                {flightSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between hover:bg-slate-50 items-center border-b py-4">
                        <div className="flex space-x-6">
                            <div>
                                <p className="text-lg text-gray-800 font-semibold">{schedule.airline}</p>
                                <p className="text-sm text-gray-500">{schedule.departure} - {schedule.arrival}</p>
                                <p className="text-sm text-gray-500">{schedule.duration}</p>
                                <p className="text-sm text-gray-500">{schedule.stops}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-800 font-bold">{schedule.price}</p>
                            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                View Fare
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


const FlightFilters = () => {
    const [nonRefundable, setNonRefundable] = useState(false);
    const [selectedStops, setSelectedStops] = useState({ nonStop: false, oneStop: false, twoStop: false });
    const [selectedAirlines, setSelectedAirlines] = useState({
        IndiGo: false,
        AirIndia: false,
        AkasaAir: false,
    });
    const [arrivalTime, setArrivalTime] = useState([new Date('2025-01-07T04:20:00'), new Date('2025-01-08T02:50:00')]);

    const handleStopChange = (e) => {
        const { name, checked } = e.target;
        setSelectedStops((prevStops) => ({
            ...prevStops,
            [name]: checked,
        }));
    };

    const handleAirlineChange = (e) => {
        const { name, checked } = e.target;
        setSelectedAirlines((prevAirlines) => ({
            ...prevAirlines,
            [name]: checked,
        }));
    };

    const handleArrivalTimeChange = (e) => {
        const [startTime, endTime] = e.target.value.split(',');
        setArrivalTime([new Date(startTime), new Date(endTime)]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Filters</h3>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Hide Non-refundable Flights</label>
                    <input
                        type="checkbox"
                        checked={nonRefundable}
                        onChange={() => setNonRefundable(!nonRefundable)}
                        className="h-5 w-5"
                    />
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Stops</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="nonStop"
                                checked={selectedStops.nonStop}
                                onChange={handleStopChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Non-stop</span> - ₹5,499
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="oneStop"
                                checked={selectedStops.oneStop}
                                onChange={handleStopChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">1 Stop</span> - ₹5,670
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="twoStop"
                                checked={selectedStops.twoStop}
                                onChange={handleStopChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">2 Stops</span> - ₹6,200
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Airlines</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="IndiGo"
                                checked={selectedAirlines.IndiGo}
                                onChange={handleAirlineChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">IndiGo (40)</span> - ₹5,499
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="AirIndia"
                                checked={selectedAirlines.AirIndia}
                                onChange={handleAirlineChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Air India (67)</span> - ₹5,555
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="AkasaAir"
                                checked={selectedAirlines.AkasaAir}
                                onChange={handleAirlineChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Akasa Air (3)</span> - ₹5,654
                        </label>
                        <div className="mt-2 text-blue-500">+ 2 more</div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Arrival to BOM</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={(arrivalTime[0].getTime() - new Date('2025-01-07T04:20:00').getTime()) / (new Date('2025-01-08T02:50:00').getTime() - new Date('2025-01-07T04:20:00').getTime())}
                        onChange={handleArrivalTimeChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>07 Jan 04:20 AM</span>
                        <span>08 Jan 02:50 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


function BusBookingPage() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-evenly space-x-4">
                {/* One Way / Round Trip */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" defaultChecked />
                        <span className="text-gray-700">One Way</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" />
                        <span className="text-gray-700">Round Trip</span>
                    </label>
                </div>

                {/* From and To Locations */}
                <div className="flex items-center space-x-6">
                    <div>
                        <label className="block text-sm text-gray-500">From</label>
                        <input
                            type="text"
                            placeholder="Delhi"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                        />
                        <p className="text-sm text-gray-400">New Delhi, India</p>
                    </div>
                    <span className="text-2xl text-gray-500">↔</span>
                    <div>
                        <label className="block text-sm text-gray-500">To</label>
                        <input
                            type="text"
                            placeholder="Mumbai"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                        />
                        <p className="text-sm text-gray-400">Mumbai, Maharashtra</p>
                    </div>
                </div>

                {/* Departure Date */}
                <div>
                    <label className="block text-sm text-gray-500">Departure Date</label>
                    <input
                        type="date"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                    <p className="text-sm text-gray-400">Save More</p>
                </div>

                {/* Add Return */}
                <div>
                    <label className="block text-sm text-gray-500">&nbsp;</label>
                    <p className="text-blue-500 cursor-pointer hover:underline text-lg">+ Add Return</p>
                </div>

                {/* Passengers & Bus Class */}
                <div>
                    <label className="block text-sm text-gray-500">Passengers & Bus Class</label>
                    <input
                        type="text"
                        placeholder="1 Passenger"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                    <p className="text-sm text-gray-400">AC Sleeper</p>
                </div>

                {/* Search Button */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
                    // Handle search button click
                >
                    Search Buses
                </button>
            </div>

            {/* Special Fares */}
            <div className="flex justify-center space-x-4 mt-4">
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Armed Forces
                </button>
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Student
                </button>
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Senior Citizen
                </button>
            </div>
        </div>

    );
}
function BusSchedule({ busSchedules }) {
    return (
        <div className="mt-6 w-[60%] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Bus Schedules</h3>
            <div className="mt-4 space-y-4">
                {busSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between hover:bg-slate-50 items-center border-b py-4">
                        <div className="flex space-x-6">
                            <div>
                                <p className="text-lg text-gray-800 font-semibold">{schedule.busOperator}</p>
                                <p className="text-sm text-gray-500">{schedule.departure} - {schedule.arrival}</p>
                                <p className="text-sm text-gray-500">{schedule.busType}</p>
                                <p className="text-sm text-gray-500">{schedule.stops} stops</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-800 font-bold">{schedule.price}</p>
                            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                View Fare
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const BusFilters = () => {
    const [nonAC, setNonAC] = useState(false);
    const [selectedBusTypes, setSelectedBusTypes] = useState({ AC: false, NonAC: false, Sleeper: false });
    const [selectedOperators, setSelectedOperators] = useState({
        Volvo: false,
        ShreeTravels: false,
        KSRTC: false,
    });
    const [departureTime, setDepartureTime] = useState([new Date('2025-01-07T04:20:00'), new Date('2025-01-08T02:50:00')]);

    const handleBusTypeChange = (e) => {
        const { name, checked } = e.target;
        setSelectedBusTypes((prevBusTypes) => ({
            ...prevBusTypes,
            [name]: checked,
        }));
    };

    const handleOperatorChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOperators((prevOperators) => ({
            ...prevOperators,
            [name]: checked,
        }));
    };

    const handleDepartureTimeChange = (e) => {
        const [startTime, endTime] = e.target.value.split(',');
        setDepartureTime([new Date(startTime), new Date(endTime)]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Bus Filters</h3>

            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Hide Non-AC Buses</label>
                    <input
                        type="checkbox"
                        checked={nonAC}
                        onChange={() => setNonAC(!nonAC)}
                        className="h-5 w-5"
                    />
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Bus Type</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="AC"
                                checked={selectedBusTypes.AC}
                                onChange={handleBusTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">AC</span> - ₹1,500
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="NonAC"
                                checked={selectedBusTypes.NonAC}
                                onChange={handleBusTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Non-AC</span> - ₹1,000
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Sleeper"
                                checked={selectedBusTypes.Sleeper}
                                onChange={handleBusTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Sleeper</span> - ₹1,200
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Bus Operators</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Volvo"
                                checked={selectedOperators.Volvo}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Volvo</span> - ₹1,500
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="ShreeTravels"
                                checked={selectedOperators.ShreeTravels}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Shree Travels</span> - ₹1,200
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="KSRTC"
                                checked={selectedOperators.KSRTC}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">KSRTC</span> - ₹1,000
                        </label>
                        <div className="mt-2 text-blue-500">+ 3 more</div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Departure Time</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={(departureTime[0].getTime() - new Date('2025-01-07T04:20:00').getTime()) / (new Date('2025-01-08T02:50:00').getTime() - new Date('2025-01-07T04:20:00').getTime())}
                        onChange={handleDepartureTimeChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>07 Jan 04:20 AM</span>
                        <span>08 Jan 02:50 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TrainBookingPage() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-evenly space-x-4">
                {/* One Way / Round Trip */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" defaultChecked />
                        <span className="text-gray-700">One Way</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" />
                        <span className="text-gray-700">Round Trip</span>
                    </label>
                </div>

                {/* From and To Locations */}
                <div className="flex items-center space-x-6">
                    <div>
                        <label className="block text-sm text-gray-500">From</label>
                        <input
                            type="text"
                            placeholder="Delhi"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                        />
                        <p className="text-sm text-gray-400">New Delhi, India</p>
                    </div>
                    <span className="text-2xl text-gray-500">↔</span>
                    <div>
                        <label className="block text-sm text-gray-500">To</label>
                        <input
                            type="text"
                            placeholder="Mumbai"
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg w-20 text-gray-900"
                        />
                        <p className="text-sm text-gray-400">Mumbai, Maharashtra</p>
                    </div>
                </div>

                {/* Departure Date */}
                <div>
                    <label className="block text-sm text-gray-500">Departure Date</label>
                    <input
                        type="date"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                    <p className="text-sm text-gray-400">Save More</p>
                </div>

                {/* Add Return */}
                <div>
                    <label className="block text-sm text-gray-500">&nbsp;</label>
                    <p className="text-blue-500 cursor-pointer hover:underline text-lg">+ Add Return</p>
                </div>

                {/* Passengers & Train Class */}
                <div>
                    <label className="block text-sm text-gray-500">Passengers & Train Class</label>
                    <input
                        type="text"
                        placeholder="1 Passenger"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                    <p className="text-sm text-gray-400">AC Sleeper, First Class, Second Class</p>
                </div>

                {/* Train Type */}
                <div>
                    <label className="block text-sm text-gray-500">Train Type</label>
                    <select className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900">
                        <option value="superFast">Superfast</option>
                        <option value="express">Express</option>
                        <option value="mail">Mail</option>
                        <option value="local">Local</option>
                    </select>
                </div>

                {/* Search Button */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
                    // Handle search button click
                >
                    Search Trains
                </button>
            </div>

            {/* Special Fares */}
            <div className="flex justify-center space-x-4 mt-4">
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Armed Forces
                </button>
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Student
                </button>
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Senior Citizen
                </button>
                <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                    Tatkal
                </button>
            </div>

            {/* Seat Preference */}
            <div className="mt-4 flex flex-col items-center">
                <label className="block text-sm text-gray-500">Seat Preference</label>
                <div className='flex  justify-center space-x-4'>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">Window</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">Aisle</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">Middle</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
function TrainSchedule({ trainSchedules }) {
    return (
        <div className="mt-6 w-[60%] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Train Schedules</h3>
            <div className="mt-4 space-y-4">
                {trainSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between hover:bg-slate-50 items-center border-b py-4">
                        <div className="flex space-x-6">
                            <div>
                                <p className="text-lg text-gray-800 font-semibold">{schedule.trainName}</p>
                                <p className="text-sm text-gray-500">
                                    {schedule.departureTime} - {schedule.arrivalTime}
                                </p>
                                <p className="text-sm text-gray-500">{schedule.trainType}</p>
                                <p className="text-sm text-gray-500">
                                    {schedule.stops} {schedule.stops === 1 ? "stop" : "stops"}
                                </p>
                                <p className="text-sm text-gray-500">Duration: {schedule.duration}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-800 font-bold">{schedule.price}</p>
                            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
const TrainFilters = () => {
    const [selectedTrainTypes, setSelectedTrainTypes] = useState({ Express: false, Superfast: false, Sleeper: false, AC: false });
    const [selectedOperators, setSelectedOperators] = useState({
        IndianRailways: false,
        Duronto: false,
        Rajdhani: false,
    });
    const [departureTime, setDepartureTime] = useState([new Date('2025-01-07T04:00:00'), new Date('2025-01-08T02:00:00')]);

    const handleTrainTypeChange = (e) => {
        const { name, checked } = e.target;
        setSelectedTrainTypes((prevTrainTypes) => ({
            ...prevTrainTypes,
            [name]: checked,
        }));
    };

    const handleOperatorChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOperators((prevOperators) => ({
            ...prevOperators,
            [name]: checked,
        }));
    };

    const handleDepartureTimeChange = (e) => {
        const [startTime, endTime] = e.target.value.split(',');
        setDepartureTime([new Date(startTime), new Date(endTime)]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Train Filters</h3>

            <div className="mt-4">
                <div>
                    <p className="font-semibold text-gray-700">Train Type</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Express"
                                checked={selectedTrainTypes.Express}
                                onChange={handleTrainTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Express</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Superfast"
                                checked={selectedTrainTypes.Superfast}
                                onChange={handleTrainTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Superfast</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Sleeper"
                                checked={selectedTrainTypes.Sleeper}
                                onChange={handleTrainTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Sleeper</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="AC"
                                checked={selectedTrainTypes.AC}
                                onChange={handleTrainTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">AC</span>
                        </label>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Train Operators</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="IndianRailways"
                                checked={selectedOperators.IndianRailways}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Indian Railways</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Duronto"
                                checked={selectedOperators.Duronto}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Duronto</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Rajdhani"
                                checked={selectedOperators.Rajdhani}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Rajdhani</span>
                        </label>
                        <div className="mt-2 text-blue-500">+ 3 more</div>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-gray-700">Departure Time</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={(departureTime[0].getTime() - new Date('2025-01-07T04:00:00').getTime()) / (new Date('2025-01-08T02:00:00').getTime() - new Date('2025-01-07T04:00:00').getTime())}
                        onChange={handleDepartureTimeChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>07 Jan 04:00 AM</span>
                        <span>08 Jan 02:00 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function MetroBookingPage() {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-evenly space-x-4">
                {/* One Way / Round Trip */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" defaultChecked />
                        <span className="text-gray-700">One Way</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="trip" />
                        <span className="text-gray-700">Round Trip</span>
                    </label>
                </div>

                {/* From and To Locations */}
                <div className="flex items-center space-x-6">
                    <div>
                        <label className="block text-sm text-gray-500">From</label>
                        <select
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        >
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Kolkata">Kolkata</option>
                        </select>
                    </div>
                    <span className="text-2xl text-gray-500">↔</span>
                    <div>
                        <label className="block text-sm text-gray-500">To</label>
                        <select
                            className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        >
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Kolkata">Kolkata</option>
                        </select>
                    </div>
                </div>

                {/* Departure Date */}
                <div>
                    <label className="block text-sm text-gray-500">Departure Date</label>
                    <input
                        type="date"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                </div>

                {/* Add Return */}
                <div>
                    <label className="block text-sm text-gray-500">&nbsp;</label>
                    <p className="text-blue-500 cursor-pointer hover:underline text-lg">+ Add Return</p>
                </div>

                {/* Number of Passengers */}
                <div>
                    <label className="block text-sm text-gray-500">Passengers</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1"
                        className="border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                </div>

                {/* Search Button */}
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
                    // Handle search button click
                >
                    Search Metro
                </button>
            </div>

            {/* Seat Preference */}
            <div className="mt-6 flex flex-col items-center">
                <label className="block text-sm text-gray-500">Seat Preference</label>
                <div className="flex justify-center space-x-4">
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">Window</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">Aisle</span>
                    </label>
                    <label className="flex items-center space-x-1">
                        <input type="radio" name="seatPreference" />
                        <span className="text-gray-700">No Preference</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
function MetroSchedule({ metroSchedules }) {
    return (
        <div className="mt-6 w-[60%] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Metro Schedules</h3>
            <div className="mt-4 space-y-4">
                {metroSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between hover:bg-slate-50 items-center border-b py-4">
                        <div className="flex space-x-6">
                            <div>
                                <p className="text-lg text-gray-800 font-semibold">{schedule.metroName}</p>
                                <p className="text-sm text-gray-500">
                                    {schedule.departureTime} - {schedule.arrivalTime}
                                </p>
                                <p className="text-sm text-gray-500">{schedule.metroType}</p>
                                <p className="text-sm text-gray-500">
                                    {schedule.stops} {schedule.stops === 1 ? "stop" : "stops"}
                                </p>
                                <p className="text-sm text-gray-500">Duration: {schedule.duration}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-gray-800 font-bold">{schedule.price}</p>
                            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MetroFilters() {
    const [selectedMetroTypes, setSelectedMetroTypes] = useState({ Express: false, Superfast: false, Sleeper: false, AC: false });
    const [selectedOperators, setSelectedOperators] = useState({
        DelhiMetro: false,
        MumbaiMetro: false,
        BangaloreMetro: false,
    });
    const [departureTime, setDepartureTime] = useState([new Date('2025-01-07T04:00:00'), new Date('2025-01-08T02:00:00')]);

    const handleMetroTypeChange = (e) => {
        const { name, checked } = e.target;
        setSelectedMetroTypes((prevMetroTypes) => ({
            ...prevMetroTypes,
            [name]: checked,
        }));
    };

    const handleOperatorChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOperators((prevOperators) => ({
            ...prevOperators,
            [name]: checked,
        }));
    };

    const handleDepartureTimeChange = (e) => {
        const [startTime, endTime] = e.target.value.split(',');
        setDepartureTime([new Date(startTime), new Date(endTime)]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Metro Filters</h3>

            <div className="mt-4">
                <div>
                    <p className="font-semibold text-gray-700">Metro Type</p>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Express"
                                checked={selectedMetroTypes.Express}
                                onChange={handleMetroTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Express</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Superfast"
                                checked={selectedMetroTypes.Superfast}
                                onChange={handleMetroTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Superfast</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="Sleeper"
                                checked={selectedMetroTypes.Sleeper}
                                onChange={handleMetroTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Sleeper</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="AC"
                                checked={selectedMetroTypes.AC}
                                onChange={handleMetroTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">AC</span>
                        </label>
                    </div>
                </div>

                <div className="mt-4">

                    <p className="font-semibold text-gray-700">Metro Operators</p>

                    <div className="space-y-2">
                        
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="DelhiMetro"
                                checked={selectedOperators.DelhiMetro}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Delhi Metro</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="MumbaiMetro"
                                checked={selectedOperators.MumbaiMetro}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Mumbai Metro</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="BangaloreMetro"
                                checked={selectedOperators.BangaloreMetro}
                                onChange={handleOperatorChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">Bangalore Metro</span>
                        </label>
                        <div className="mt-2 text-blue-500">+ 3 more</div>
                    </div>
                </div>

                <div className="mt-4">
                    

                    <p className="font-semibold text-gray-700">Departure Time</p>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={(departureTime[0].getTime() - new Date('2025-01-07T04:00:00').getTime()) / (new Date('2025-01-08T02:00:00').getTime() - new Date('2025-01-07T04:00:00').getTime())}
                        onChange={handleDepartureTimeChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>07 Jan 04:00 AM</span>
                        <span>08 Jan 02:00 AM</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HotelBookingPage() {
    return (
        <div className="w-[60%] m-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Hotel Booking</h1>
            
            {/* Booking Form */}
            <div className="space-y-6">
                {/* Location */}
                <div>
                    <label className="block text-sm text-gray-500">Location</label>
                    <input
                        type="text"
                        placeholder="Enter a city or hotel name"
                        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                </div>
                
                {/* Check-in and Check-out Dates */}
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <label className="block text-sm text-gray-500">Check-in Date</label>
                        <input
                            type="date"
                            className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-gray-500">Check-out Date</label>
                        <input
                            type="date"
                            className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                        />
                    </div>
                </div>
                
                {/* Number of Guests */}
                <div>
                    <label className="block text-sm text-gray-500">Number of Guests</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1"
                        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    />
                </div>

                {/* Room Type */}
                <div>
                    <label className="block text-sm text-gray-500">Room Type</label>
                    <select
                        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    >
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                        <option value="suite">Suite</option>
                        <option value="family">Family Room</option>
                    </select>
                </div>
                
                {/* Special Requests */}
                <div>
                    <label className="block text-sm text-gray-500">Special Requests</label>
                    <textarea
                        placeholder="Add any special requests (e.g., late check-in, extra bed)"
                        rows="3"
                        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-400 text-lg text-gray-900"
                    ></textarea>
                </div>
                
                {/* Search Button */}
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
                    // Handle search button click
                >
                    Search Hotels
                </button>
            </div>

            {/* Popular Options */}
            <div className="mt-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-800">Popular Filters</h2>
                <div className="flex space-x-4">
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Free WiFi
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Breakfast Included
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Pool Access
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Parking Available
                    </button>
                    <button className="border rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100">
                        Pet Friendly
                    </button>
                </div>
            </div>
        </div>
    );
}
function HotelRoomCards({ hotelRooms }) {
    return (
        <div className="mt-6 w-[60%] bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Hotel Rooms</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelRooms.map((room, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md border p-4 hover:shadow-lg transition"
                    >
                        {/* Room Details */}
                        <div>
                            <h4 className="text-lg font-bold text-gray-800">{room.roomName}</h4>
                            <p className="text-sm text-gray-500">{room.roomType}</p>
                            <p className="mt-2 text-sm text-gray-600">
                                Amenities: {room.amenities.join(", ")}
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                Max Guests: {room.maxGuests}
                            </p>
                        </div>
                        {/* Room Price and Book Button */}
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-lg font-bold text-gray-800">{room.price}</p>
                            <button className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
function HotelRoomFilters() {
    const [selectedRoomTypes, setSelectedRoomTypes] = useState({
        Single: false,
        Double: false,
        Suite: false,
        Family: false,
    });

    const [selectedAmenities, setSelectedAmenities] = useState({
        WiFi: false,
        Breakfast: false,
        Pool: false,
        Gym: false,
        Parking: false,
    });

    const [priceRange, setPriceRange] = useState([50, 500]); // Default price range: $50 - $500
    const [guestCapacity, setGuestCapacity] = useState(1); // Minimum 1 guest

    const handleRoomTypeChange = (e) => {
        const { name, checked } = e.target;
        setSelectedRoomTypes((prevRoomTypes) => ({
            ...prevRoomTypes,
            [name]: checked,
        }));
    };

    const handleAmenitiesChange = (e) => {
        const { name, checked } = e.target;
        setSelectedAmenities((prevAmenities) => ({
            ...prevAmenities,
            [name]: checked,
        }));
    };

    const handlePriceRangeChange = (e) => {
        const [minPrice, maxPrice] = e.target.value.split(",").map(Number);
        setPriceRange([minPrice, maxPrice]);
    };

    const handleGuestCapacityChange = (e) => {
        setGuestCapacity(Number(e.target.value));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Hotel Room Filters</h3>

            {/* Room Type Filters */}
            <div className="mt-4">
                <p className="font-semibold text-gray-700">Room Type</p>
                <div className="space-y-2">
                    {["Single", "Double", "Suite", "Family"].map((type) => (
                        <label key={type} className="flex items-center">
                            <input
                                type="checkbox"
                                name={type}
                                checked={selectedRoomTypes[type]}
                                onChange={handleRoomTypeChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Amenities Filters */}
            <div className="mt-4">
                <p className="font-semibold text-gray-700">Amenities</p>
                <div className="space-y-2">
                    {["WiFi", "Breakfast", "Pool", "Gym", "Parking"].map((amenity) => (
                        <label key={amenity} className="flex items-center">
                            <input
                                type="checkbox"
                                name={amenity}
                                checked={selectedAmenities[amenity]}
                                onChange={handleAmenitiesChange}
                                className="h-5 w-5"
                            />
                            <span className="ml-2 text-gray-700">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mt-4">
                <p className="font-semibold text-gray-700">Price Range</p>
                <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={priceRange.join(",")}
                    onChange={handlePriceRangeChange}
                    className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* Guest Capacity Filter */}
            <div className="mt-4">
                <p className="font-semibold text-gray-700">Guest Capacity</p>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={guestCapacity}
                    onChange={handleGuestCapacityChange}
                    className="border rounded w-16 px-2 py-1 text-gray-700"
                />
                <span className="ml-2 text-gray-600">guests</span>
            </div>
        </div>
    );
}
