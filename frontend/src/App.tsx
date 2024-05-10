import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUser } from './slices/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './config/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
