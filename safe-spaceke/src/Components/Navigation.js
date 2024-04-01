import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => (
  <nav className="navigation">
  <div className="logo">SafeSpace.ke</div>
  <ul className="links">
    <li><Link to="/" className="link">Home</Link></li>
    <li><Link to="/submit" className="link">Submit</Link></li>
  </ul>
</nav>
);

export default Navigation;