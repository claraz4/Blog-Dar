import React from 'react';
import './NavBar.css'; 

const NavBar = () => {
    return (
        <div className="topnav">
             <div className="nav-title">The Blog Mix</div> {/* Add title here */}
            <a className="active" href="#home">
                <div className="icon-text">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text">Home</span>
                </div>
            </a>
            <a href="#news">
                <div className="icon-text">
                    <span className="material-symbols-outlined">edit_square</span>
                    <span className="text">Post</span>
                </div>
            </a>
            <a href="#contact">
                <div className="icon-text">
                    <span className="material-symbols-outlined">contact_mail</span>
                    <span className="text">Contact</span>
                </div>
            </a>
            <a href="#about">
                <div className="icon-text">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text">Logout</span>
                </div>
            </a>
        </div>
    );
};

export default NavBar;
