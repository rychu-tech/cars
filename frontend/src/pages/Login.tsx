import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../slices/authSlice';
import { AppDispatch, RootState } from '../config/store';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';

const Login: React.FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = () => {
        if (!login || !password) {
            toast.error("Username and password fields cannot be empty!");
            return;
        }

        dispatch(loginUser({ login, password }))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    toast.success("Login successful!");
                    navigate('/dashboard');
                } else {
                    toast.error("Invalid credentials!");
                }
            });
    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <div className="px-8 py-6 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Welcome back!</h3>
                <form>
                    <div className="mt-4">
                        <label className="block" htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <LoadingButton
                            size="large"
                            onClick={() => handleLogin()}
                            endIcon={<LoginIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Login
                        </LoadingButton>
                    </div>
                </form>
                <div className="mt-4 text-center text-red-500">
                    <p>Test Login: admin@admin.pl</p>
                    <p>Test Password: admin</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
