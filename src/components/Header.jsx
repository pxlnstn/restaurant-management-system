import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <h1>Restaurant Management System</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/manager">Manager</NavLink>
        <NavLink to="/waiter">Waiter</NavLink>
        <NavLink to="/kitchen">Kitchen</NavLink>
        <NavLink to="/table/1">Customer (Table 1)</NavLink>
      </nav>
    </header>
  );
};

export default Header;