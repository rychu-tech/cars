import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  }

  return (
    <nav className="bg-black w-full">
      <div className="flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={require('../images/logo.png')} className="h-8" alt="Car Dealership Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Car Dealership</span>
        </Link>
        <div className="flex flex-grow justify-center">
          <ul className="flex p-0 font-medium border rounded-lg space-x-8 mt-0 border-0 bg-black">
            <li>
              <Link to="/" className="block text-white rounded p-0 hover:text-blue-500 hover:bg-transparent">Dashboard</Link>
            </li>
            <li>
              <Link to="/cars" className="block text-white rounded p-0 hover:text-blue-500 hover:bg-transparent">Cars</Link>
            </li>
          </ul>
        </div>
        <button 
          onClick={handleLoginClick} // Attach the navigate function to onClick event
          type="button" 
          className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700">
            Log In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
