import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ManagerDashboard = () => {
  const { menu, addMenuItem, editMenuItem, deleteMenuItem } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [formState, setFormState] = useState({ name: '', description: '', price: '', image: '' });
  const placeholderImage = '/src/assets/food-placeholder.png';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { ...formState, price: parseFloat(formState.price) };
    if (isEditing) {
      editMenuItem({ ...itemData, id: isEditing.id });
    } else {
      addMenuItem(itemData);
    }
    resetForm();
  };

  const handleEditClick = (item) => {
    setIsEditing(item);
    setFormState({ name: item.name, description: item.description, price: item.price.toString(), image: item.image || '' });
    setIsAdding(true);
  };
  
  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormState({ name: '', description: '', price: '', image: '' });
  };

  return (
    <div className="dashboard-container">
      <h2>Manager Dashboard - Menu Management</h2>
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)}>Add New Menu Item</button>
      ) : (
        <div className="form-container">
          <h3>{isEditing ? 'Edit' : 'Add'} Menu Item</h3>
          <form onSubmit={handleSubmit}>
            <input name="name" value={formState.name} onChange={handleInputChange} placeholder="Item Name" required />
            <input name="description" value={formState.description} onChange={handleInputChange} placeholder="Description" required />
            <input type="number" name="price" value={formState.price} onChange={handleInputChange} placeholder="Price" step="0.01" required />
            <input name="image" value={formState.image} onChange={handleInputChange} placeholder="Image URL (optional)" />
            <div className="form-buttons">
              <button type="submit">{isEditing ? 'Update Item' : 'Save Item'}</button>
              <button type="button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="menu-list-manager">
        {menu.map(item => (
          <div key={item.id} className="menu-item-manager">
            <img src={item.image || placeholderImage} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button className="delete" onClick={() => deleteMenuItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;