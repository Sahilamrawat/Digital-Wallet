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
import './Styles.css';
const flightSchedules = [
    { airline: 'Air India', departure: '10:00 AM', price: '₹5,000' },
    { airline: 'IndiGo', departure: '12:30 PM', price: '₹4,500' },
    { airline: 'SpiceJet', departure: '03:15 PM', price: '₹6,200' },
    { airline: 'GoAir', departure: '06:00 PM', price: '₹5,500' },
    { airline: 'Vistara', departure: '08:30 AM', price: '₹7,000' },
    { airline: 'AirAsia', departure: '09:45 AM', price: '₹4,200' },
    { airline: 'Jet Airways', departure: '11:00 AM', price: '₹6,800' },
    { airline: 'Air India', departure: '01:00 PM', price: '₹5,300' },
    { airline: 'IndiGo', departure: '02:30 PM', price: '₹4,800' },
    { airline: 'SpiceJet', departure: '04:45 PM', price: '₹5,600' },
    { airline: 'GoAir', departure: '05:30 PM', price: '₹5,400' },
    { airline: 'Vistara', departure: '07:00 PM', price: '₹7,500' },
    { airline: 'AirAsia', departure: '08:15 PM', price: '₹4,700' },
    { airline: 'Jet Airways', departure: '09:30 PM', price: '₹6,900' },
    { airline: 'Air India', departure: '10:45 PM', price: '₹5,800' },
    { airline: 'IndiGo', departure: '11:50 PM', price: '₹4,600' },
    { airline: 'SpiceJet', departure: '01:15 AM', price: '₹5,400' },
    { airline: 'GoAir', departure: '02:30 AM', price: '₹5,200' },
    { airline: 'Vistara', departure: '04:00 AM', price: '₹7,300' },
    { airline: 'AirAsia', departure: '05:30 AM', price: '₹4,500' }
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
        // BusBooking, // Bus Tickets Background
        // TrainBooking, // Train Tickets Background
        // MetroBooking, // Metro Tickets Background
        // HotelBooking, // Hotel Rooms Background
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
                <div className="w-[100%] h-[30%] text-[100px] items-center justify-center flex font-mono text-[#2E5077] hover:scale-105 transition-transform duration-300">
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
            </div>

            <div className="w-[100%] flex flex-col items-center justify-center">
                <div className="recharge-form-container w-[100%] h-max m-10 p-10">
                    {activeIndex === 0 && <MovieBrowsingPage />}
                    {activeIndex === 1 && <FlightsSchedule flightSchedules={flightSchedules} />}
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
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Available Flight Schedules</h3>
            <div className="mt-4 space-y-4">
                {flightSchedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center border-b py-2">
                        <div>
                            <p className="text-lg text-gray-800">{schedule.airline}</p>
                            <p className="text-sm text-gray-500">{schedule.departure}</p>
                        </div>
                        <p className="text-lg text-gray-800">{schedule.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

