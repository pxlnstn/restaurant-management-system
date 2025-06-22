import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="dashboard-container home-container">
      <h2>Welcome to the Restaurant System</h2>
      <p>Please select your role to begin.</p>
      <div className="role-selection">
        <Link to="/manager" className="role-card">
          <h3>Manager</h3>
          <p>Manage menu, staff, and reports.</p>
        </Link>
        <Link to="/waiter" className="role-card">
          <h3>Waiter/Server</h3>
          <p>View tables and manage orders.</p>
        </Link>
        <Link to="/kitchen" className="role-card">
          <h3>Kitchen Staff</h3>
          <p>View and prepare incoming orders.</p>
        </Link>
        <Link to="/table/1" className="role-card">
          <h3>Customer</h3>
          <p>View menu and place an order (Demo for Table 1).</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;