import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUser } from './slices/authSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './config/store';
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { initialCheckDone } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (!initialCheckDone) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
          <h2 className="text-white text-xl font-semibold mt-4">Loading...</h2>
        </div>
      </div>
    );
  }

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
