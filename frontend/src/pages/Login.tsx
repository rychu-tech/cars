// Login.js
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="px-8 py-6 text-left bg-white shadow-lg" style={{ maxWidth: '400px' }}>
        <h3 className="text-2xl font-bold text-center">Welcome back!</h3>
        <form action="">
          <div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <input type="text" placeholder="Email"
                     id="email"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input type="password" placeholder="Password"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
