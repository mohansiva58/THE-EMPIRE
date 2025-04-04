import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoo from "./logoo.png"; // Replace with your actual logo path
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logoo} alt="Logo" />
                </Link>
            </div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
                <div className={`hamburger ${menuOpen ? "active" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                    <Link to="/products" className="dropdown-toggle">Products</Link>
                    <div className="dropdown-content">
                        <Link to="/products/kurthas">Kurthas</Link>
                        <Link to="/products/jeans">Jeans</Link>
                        <Link to="/products/Sweatshirts">Sweatshirts</Link>
                        <Link to="/products/Tshirts">T-shirts</Link>
                        <Link to="/products/Formals">Formals</Link>
                        <Link to="/products/Hoodies">Hoodies</Link>
                    </div>
                </li>
                <li><Link to="/Blazers">Blazers</Link></li>
                <li><Link to="/WeddingCollection">Wedding Collection</Link></li>
                <li><Link to="/PremiumCollection">Premium Collection</Link></li>
                <li><Link to="/jackets">Jackets</Link></li>
                <li><Link to="/Collaborations">Collaborations</Link></li>
                <li>
                    <Link to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/Address">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    </Link>
                </li>
                <li>
                    <Link to="/Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;