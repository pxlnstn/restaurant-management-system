import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const KitchenView = () => {
  const { orders, updateOrderStatus } = useContext(AppContext);

  const getStatusColumn = (status) => {
    return orders
      .filter(order => order.status === status)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort by oldest first
      .map(order => (
        <div key={order.id} className="order-card">
          <h4>Table {order.tableId}</h4>
          <span>Order #{order.id}</span>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          {status === 'New' && (
            <button onClick={() => updateOrderStatus(order.id, 'Preparing')}>Start Preparing</button>
          )}
          {status === 'Preparing' && (
            <button onClick={() => updateOrderStatus(order.id, 'Ready')}>Mark as Ready</button>
          )}
        </div>
      ));
  };

  return (
    <div className="dashboard-container">
      <h2>Kitchen Order System (KOS)</h2>
      <div className="kos-layout">
        <div className="kos-column">
          <h3>New Orders</h3>
          <div className="order-list">{getStatusColumn('New')}</div>
        </div>
        <div className="kos-column">
          <h3>Preparing</h3>
          <div className="order-list">{getStatusColumn('Preparing')}</div>
        </div>
        <div className="kos-column">
          <h3>Ready for Pickup</h3>
          <div className="order-list">{getStatusColumn('Ready')}</div>
        </div>
      </div>
    </div>
  );
};

export default KitchenView;