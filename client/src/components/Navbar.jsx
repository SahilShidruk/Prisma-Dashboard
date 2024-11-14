import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  async function getMe() {
    const response = await axios.get('http://localhost:3000/user/me', {
      withCredentials: true
    });
    setUser(response.data);
  }
   useEffect(() => {
     getMe();
   }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              onClick={closeDropdown}
            >
              <li><a href="/get-started">Get Started</a></li>
              <li><a href="/docs">Docs</a></li>
              <li><a href="/add-to-server">Add to Server</a></li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl text-blue-400">Prisma Bot</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-accent">Docs</a>
      </div>
    </div>
  );
}

export default Navbar;
