import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../config/store';
import { loginUser, logoutUser } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const {loggedIn} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success("Logout successful!");
            navigate('/login');
        } else {
            toast.error('Something went wrong!');
        }
   })
  }

  return (
    <nav className="bg-black w-full">
      <div className="flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={require('../images/logo.png')} className="h-8" alt="Car Dealership Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Car Dealership</span>
        </Link>
        {loggedIn
            ? <>
                <div className="flex flex-grow justify-center">
                  <ul className="flex p-0 font-medium border rounded-lg space-x-8 mt-0 border-0 bg-black">
                    <li>
                      <Link to="/dashboard" className="block text-white rounded p-0 hover:text-blue-500 hover:bg-transparent">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/cars" className="block text-white rounded p-0 hover:text-blue-500 hover:bg-transparent">Cars</Link>
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={handleLogout}
                  type="button" 
                  className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700">
                    Log Out
              </button>
            </>
            :
              <button 
                onClick={handleLogin}
                type="button" 
                className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700">
                  Log In
              </button>
          }
      </div>
    </nav>
  );
}

export default Navbar;
