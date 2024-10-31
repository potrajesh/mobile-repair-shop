// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#007bff', padding: '10px', color: 'white' }}>
      <h2>Mobile Repair Shop</h2>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/showall" style={{ color: 'white', textDecoration: 'none' }}>All Repairs List</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/outlist" style={{ color: 'white', textDecoration: 'none' }}>OutList</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/underrepair" style={{ color: 'white', textDecoration: 'none' }}>UnderRepair</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
