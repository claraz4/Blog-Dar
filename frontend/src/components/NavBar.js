import React from 'react';
import '../styles/NavBar.css';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="topnav">
            <div className="nav-title">The Blog Mix</div>
            <Link className="active" to="/">
                <div className="icon-text">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text">Home</span>
                </div>
            </Link>
            <Link to="/write">
                <div className="icon-text">
                    <span className="material-symbols-outlined">edit_square</span>
                    <span className="text">Post</span>
                </div>
            </Link>
            <Link to="/account">
                <div className="icon-text">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text">Account</span>
                </div>
            </Link>
            <Link to="/logout">
                <div className="icon-text">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text">Logout</span>
                </div>
            </Link>
        </div>
    );
};

export default NavBar;
