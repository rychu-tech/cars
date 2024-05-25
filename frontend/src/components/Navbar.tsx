import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import { logoutUser } from '../slices/authSlice';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [showPopup, setShowPopup] = useState<boolean>(false);

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
    <nav className="bg-black w-full relative">
      <div className="flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={require('../images/logo.png')} className="h-8" alt="Car Dealership Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Car Dealership</span>
        </Link>
        {loggedIn ? (
          <>
            <div className="flex flex-grow justify-center">
              <ul className="flex p-0 font-medium border rounded-lg space-x-8 mt-0 border-0 bg-black">
                <li>
                  <Link
                    to="/dashboard"
                    className={`block rounded p-0 ${location.pathname === '/dashboard' ? 'text-blue-500' : 'text-white hover:text-blue-500'}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cars"
                    className={`block rounded p-0 ${location.pathname === '/cars' ? 'text-blue-500' : 'text-white hover:text-blue-500'}`}
                  >
                    Cars
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="text-white mr-4 relative"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              <AccountCircleIcon fontSize="large" />
              {showPopup && (
                <div className="z-40 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white text-black text-center rounded-lg shadow-lg p-2">
                  {login}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              type="button"
              className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            type="button"
            className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
