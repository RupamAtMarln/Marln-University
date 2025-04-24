import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role) => {
    login(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex h-screen">
      {/* Left: Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-16">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">NexusHive</h1>
        <p className="text-gray-500 mb-8">Choose your role to login</p>
        <button onClick={() => handleLogin('admin')} className="btn w-full">Login as Admin</button>
        <button onClick={() => handleLogin('instructor')} className="btn w-full mt-4">Login as Instructor</button>
        <button onClick={() => handleLogin('student')} className="btn w-full mt-4">Login as Student</button>
      </div>

      {/* Right: Promo */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-4xl font-bold mb-4">Empowering Digital Education</h2>
        <p className="text-lg max-w-md text-center">
          NexusHive connects students, instructors, and admins in a seamless university experience.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
