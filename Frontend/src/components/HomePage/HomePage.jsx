import React from 'react';
import '../HomePage/HomePage.css';
import { Link } from 'react-router-dom';
import ProblemTable from '../ProblemTable/ProblemTable'; // Corrected path
import leetcodeLogo from '../assets/images/leetcode.jpeg'; // Import logos
import gfgLogo from '../assets/images/gfg.jpeg';
import codingninjasLogo from '../assets/images/codingninja.png';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">CodeTracker</Link>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/problems" className="nav-link">Problems</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
             <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
        <div className="navbar-auth">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Track Your Coding Journey</h1>
          <p>
            Organize, track, and conquer coding challenges from LeetCode, GeeksforGeeks, and more. All in one place.
          </p>
           <button className="cta-btn">
            <Link to="/problems">Get Started</Link>
           </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Unified Problem Lists</h3>
            <p>Find similar problems from various platforms all in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Use checkboxes to easily mark solved problems.</p>
          </div>
          <div className="feature-card">
              <h3>Company Tag</h3>
            <p>Track question asked by various companies</p>
          </div>
           <div className="feature-card">
              <h3>User Profile</h3>
             <p> Track the profile based on the problem progress</p>
          </div>
        </div>
      </section>

        <section className="problems-list">
            <h2>Problem List</h2>
            <ProblemTable/>
      </section>


      {/* Footer */}
      <footer className="footer">
          <div className="footer-logos">
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer">
             <img src={leetcodeLogo} alt="LeetCode Logo" className="footer-logo" />
              <span className="website-name">LeetCode</span>
          </a>
           <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">
              <img src={gfgLogo} alt="GeeksforGeeks Logo" className="footer-logo" />
              <span className="website-name">GeeksforGeeks</span>
          </a>
          <a href="https://www.codingninjas.com/" target="_blank" rel="noopener noreferrer">
             <img src={codingninjasLogo} alt="Coding Ninjas Logo" className="footer-logo" />
            <span className="website-name">Coding Ninjas</span>
          </a>
      </div>
        <p>© {new Date().getFullYear()} CodeTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;