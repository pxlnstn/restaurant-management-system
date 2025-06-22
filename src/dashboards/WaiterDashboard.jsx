import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const WaiterDashboard = () => {
  // Corrected: Removed `staff` from context as it's not provided in the V1 AppContext
  const { tables, orders, processPayment, markTableForPayment, updateOrderStatus } = useContext(AppContext);
  const [selectedTable, setSelectedTable] = useState(null);

  const getTableOrders = (tableId) => {
    return orders.filter(order => order.tableId === tableId);
  };
  
  const calculateBill = (tableId) => {
    const tableOrders = getTableOrders(tableId);
    return tableOrders.reduce((total, order) => 
        total + order.items.reduce((orderTotal, item) => orderTotal + item.price * item.quantity, 0)
    , 0);
  };

  const handleTableClick = (table) => {
      setSelectedTable(table);
  };

  const closeModal = () => {
      setSelectedTable(null);
  };
  
  return (
    <div className="dashboard-container">
      <h2>Waiter Dashboard - Table View</h2>
      <div className="table-layout">
        {tables.map(table => (
          <div
            key={table.id}
            className={`table-card ${table.status}`}
            onClick={() => handleTableClick(table)}
          >
            <h3>{table.name}</h3>
            <p>Status: {table.status.replace('-', ' ')}</p>
            {/* Corrected: The V1 table object has `server` name directly */}
            <p>Server: {table.server}</p>
          </div>
        ))}
      </div>

      {selectedTable && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Details for {selectedTable.name}</h3>
                <div className="table-details">
                    <h4>Orders</h4>
                    {getTableOrders(selectedTable.id).length > 0 ? (
                        <ul>
                          {/* MODIFICATION START */}
                          {getTableOrders(selectedTable.id).map(order => (
                              <li key={order.id} className="order-item-waiter">
                                <span>Order #{order.id} - Status: {order.status}</span>
                                {/* NEW: Show 'Serve' button if order is ready */}
                                {order.status === 'Ready' && (
                                  <button 
                                    className="serve-btn" 
                                    onClick={() => updateOrderStatus(order.id, 'Served')}
                                  >
                                    Serve
                                  </button>
                                )}
                              </li>
                          ))}
                          {/* MODIFICATION END */}
                        </ul>
                    ) : <p>No active orders.</p>}
                    
                    <h4>Bill</h4>
                    <p className="total-bill">Total: ${calculateBill(selectedTable.id).toFixed(2)}</p>
                </div>
                <div className="modal-actions">
                    {selectedTable.status === 'occupied' && (
                        <button onClick={() => {
                            markTableForPayment(selectedTable.id);
                            closeModal();
                        }}>Customer wants to pay</button>
                    )}
                    {selectedTable.status === 'needs-payment' && (
                        <button className="pay-btn" onClick={() => {
                            processPayment(selectedTable.id); 
                            closeModal();
                        }}>Process Payment (Cash/Card)</button>
                    )}
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default WaiterDashboard;