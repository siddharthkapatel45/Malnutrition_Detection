import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Fetch user data including profile picture
  const fetchUserData = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      return; // No user logged in
    }

    try {
      const response = await fetch('https://reddit-project-ifyg.onrender.com/profile/getimg', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || 'Failed to fetch user data');
        return;
      }

      const data = await response.json();
      setUserData(data); // Store user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* Logo and links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>

            {/* Links */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/signup"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/Uploadimage"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload Image
                </Link>
                <Link
                  to="/patient"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Patient Registration
                </Link>
                <Link
                  to="/patientdata"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload Patient Data
                </Link>
                <Link
                  to="/table"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Patient Table
                </Link>
              </div>
            </div>
          </div>

          {/* Profile and notifications */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
  
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                type="button"
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData ? userData.imgUrl : './sidd.jpg'}
                  alt="Profile"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/signup"
            className="text-white block rounded-md bg-gray-900 px-3 py-2 text-base font-medium"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Login
          </Link>
          <Link
            to="/Uploadimage"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Upload Image
          </Link>
          <Link
            to="/patient"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Patient Registration
          </Link>
          <Link
            to="/patientdata"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Upload Patient Data
          </Link>
          <Link
            to="/table"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Patient Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
