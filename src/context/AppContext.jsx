import React, { createContext, useState } from 'react';

// MODIFIED: Added some sample orders, including one that is 'Ready' for testing
const initialData = {
  menu: [
    { id: 1, name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 15.99, image: 'https://images.unsplash.com/photo-1598021680133-eb3a729571f3?q=80&w=2524&auto=format&fit=crop' },
    { id: 2, name: 'Cheeseburger', description: 'Beef patty with cheddar cheese', price: 12.50, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2672&auto=format&fit=crop' },
    { id: 3, name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: 9.75, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2670&auto=format&fit=crop' },
  ],
  tables: [
    { id: 1, name: 'Table 1', status: 'occupied', server: 'Alice' },
    { id: 2, name: 'Table 2', status: 'occupied', server: 'Bob' },
    { id: 3, name: 'Table 3', status: 'available', server: 'Alice' },
    { id: 4, name: 'Table 4', status: 'occupied', server: 'Bob' },
  ],
  orders: [
  ],
  staff: [
    { id: 1, name: 'Alice', role: 'Server' },
    { id: 2, name: 'Bob', role: 'Server' },
    { id: 3, name: 'Charlie', role: 'Kitchen' },
  ]
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(initialData.menu);
  const [tables, setTables] = useState(initialData.tables);
  const [orders, setOrders] = useState(initialData.orders);

  // --- Manager Functions ---
  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    setMenu([...menu, newItem]);
  };
  const editMenuItem = (updatedItem) => {
    setMenu(menu.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };
  const deleteMenuItem = (itemId) => {
    setMenu(menu.filter(item => item.id !== itemId));
  };

  // --- Customer/Order Functions ---
  const placeOrder = (tableId, items) => {
    const newOrder = { id: Date.now(), tableId, items, status: 'New', timestamp: new Date() };
    setOrders([...orders, newOrder]);
    setTables(tables.map(t => t.id === tableId ? { ...t, status: 'occupied' } : t));
  };

  // --- Kitchen & Waiter Functions ---
  // The full order flow is: New -> Preparing -> Ready -> Served
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  // --- Waiter Functions ---
  const markTableForPayment = (tableId) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: 'needs-payment' } : t));
  };
  const processPayment = (tableId) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status: 'available' } : t));
    // Clear ALL orders for the table once paid
    setOrders(orders.filter(order => order.tableId !== tableId));
  };

  // We are not exporting staff as it's not used by any component in this simple version
  const value = {
    menu,
    tables,
    orders,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    placeOrder,
    updateOrderStatus,
    markTableForPayment,
    processPayment
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};