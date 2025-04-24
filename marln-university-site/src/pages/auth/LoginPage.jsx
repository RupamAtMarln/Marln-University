import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import users from '../../data/user';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login(user.role); // login via context
      navigate(`/${user.role}/dashboard`);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left: Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-16">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to NexusHive</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-blue-700 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>

      {/* Right: Promo */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Empowering Digital Education
        </h2>
        <p className="text-lg max-w-md text-center">
          NexusHive connects students, instructors, and admins in a seamless university experience.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
