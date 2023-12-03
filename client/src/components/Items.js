// Items.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/items.css'; // Import a CSS file for styling

const Items = () => {
  const [itemData, setItemData] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState({});
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    storageType: '',
    brand: '',
    type: false, // Default to toiletry
  });

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/Item')
      .then(response => {
        setItemData(response.data.Item);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUpdateQuantity = (index) => {
    // Send the updated data to the Flask server for "Quantity" update
    // You'll need to implement this part based on your server's API
    const updatedQuantityValue = editedQuantities[index] || itemData[index][1]; // Use edited quantity if available, otherwise use the current quantity
    axios.post('/updateItemQuantity', { item_name: itemData[index][0], quantity: updatedQuantityValue })
      .then(response => {
        const success = response.data.status;

        if (success === "true") {
          alert("Item quantity update successful!");
        } else {
          const reason = response.data.reason;
          alert("Item quantity update. " + reason);
          console.log("faliure reason:", reason);
        }
      })
      .catch(error => console.error('Error updating quantity:', error));
  };
  

  const handleDelete = (index) => {
    // Handle deletion logic here, e.g., show a confirmation dialog
    const updatedItems = [...itemData];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setItemData(updatedItems);
    console.log(index);
    // Send the updated data to the Flask server for deletion
    // You'll need to implement this part based on your server's API
    axios.post('/deleteItem', { index })
      .then(response => {
        console.log('Item deleted successfully');
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleInputChange = (field, value) => {
    // Update the local state with the changed value for the new item
    setNewItem(prevItem => ({ ...prevItem, [field]: value }));
  };

  const handleAddItem = () => {
    // Check if all values are entered before adding a new item
    if (Object.values(newItem).every(value => value !== '')) {
      // Convert the type to a flag (1 for food, 0 for toiletry)
      const newItemWithFlag = { ...newItem, type: newItem.type === 'food' ? 1 : 0 };

      // Add a new item column to the local state
      setItemData([...itemData, Object.values(newItemWithFlag)]);

      // Send the new item data to the Flask server for addition
      // You'll need to implement this part based on your server's API
      console.log(newItem.type);
      axios.post('/addItem', {
        item_name: newItem.name,
        quantity: newItem.quantity,
        storageType: newItem.storageType,
        brand: newItem.brand,
        itemType: newItem.type === 'food' ? 'food' : 'toiletry',
      }).then(response => {
        const success = response.data.status;

        if (success === "true") {
          console.log("Add item successful!");
        } else {
          const reason = response.data.reason;
          alert("Add admin failed. " + reason);
          console.log("faliure reason:", reason);
        }
          axios.get('/Item')
            .then(response => {
              setItemData(response.data.Item);
            })
            .catch(error => console.error('Error fetching data:', error));
        })
        .catch(error => console.error('Error adding item:', error));

      // Reset the new item state for the next entry
      setNewItem({
        name: '',
        quantity: '',
        storageType: '',
        brand: '',
        type: false,
      });
    } else {
      console.log('Please enter all values before adding a new item.');
    }
  };

  return (
    <div>
      <h3>Item Data</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Storage Type</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itemData.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>
                <input
                  type="text"
                  value={editedQuantities[index] !== undefined ? editedQuantities[index] : item[1]}
                  onChange={(e) => {
                    const newQuantities = { ...editedQuantities, [index]: e.target.value };
                    setEditedQuantities(newQuantities);
                  }}
                />
              </td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4] ? 'food' : 'toiletry'}</td>
              <td>
                <button onClick={() => handleUpdateQuantity(index)}>Update Quantity</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            {/* New item row for entering values */}
            <td>
              <input type="text" value={newItem.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </td>
            <td>
              <input type="text" value={newItem.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} />
            </td>
            <td>
              <input type="text" value={newItem.storageType} onChange={(e) => handleInputChange('storageType', e.target.value)} />
            </td>
            <td>
              <input type="text" value={newItem.brand} onChange={(e) => handleInputChange('brand', e.target.value)} />
            </td>
            <td>
              <select value={newItem.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                <option value="toiletry">Toiletry</option>
                <option value="food">Food</option>
              </select>
            </td>
            <td>
              <button onClick={handleAddItem}>Add New Item</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Items;
