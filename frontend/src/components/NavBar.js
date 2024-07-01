// NavBar.js
import React from 'react';
import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="topnav">
      <div className="nav-title">The Blog Mix</div>

      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : 'none')}>
        <div className="icon-text">
          <span className="material-symbols-outlined">home</span>
          <span className="text">Home</span>
        </div>
      </NavLink>

      <NavLink to="/write" className={({ isActive }) => (isActive ? "active" : 'none')}>
        <div className="icon-text">
          <span className="material-symbols-outlined">edit_square</span>
          <span className="text">Post</span>
        </div>
      </NavLink>

      <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : 'none')}>
        <div className="icon-text">
          <span className="material-symbols-outlined">person</span>
          <span className="text">Profile</span>
        </div>
      </NavLink>

      <NavLink to="/logout" className={({ isActive }) => (isActive ? "active" : 'none')}>
        <div className="icon-text">
          <span className="material-symbols-outlined">logout</span>
          <span className="text">Logout</span>
        </div>
      </NavLink>

      <NavLink to="/signInUp" className={({ isActive }) => (isActive ? "active" : 'none')}>
        <div className="icon-text">
          <span className="material-symbols-outlined">person_add</span>
          <span className="text">Signup</span>
        </div>
      </NavLink>
    </div>
  );
};

export default NavBar;