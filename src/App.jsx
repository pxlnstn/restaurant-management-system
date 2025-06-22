import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './dashboards/Home';
import ManagerDashboard from './dashboards/ManagerDashboard';
import WaiterDashboard from './dashboards/WaiterDashboard';
import KitchenView from './dashboards/KitchenView';
import CustomerView from './dashboards/CustomerView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/waiter" element={<WaiterDashboard />} />
          <Route path="/kitchen" element={<KitchenView />} />
          <Route path="/table/:tableId" element={<CustomerView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;