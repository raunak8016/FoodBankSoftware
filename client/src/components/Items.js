import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/items.css'; 

const Items = () => {
  const [itemData, setItemData] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState({});
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    storageType: '',
    brand: '',
    type: false,
  });

  useEffect(() => {
    axios.get('/Item')
      .then(response => {
        setItemData(response.data.Item);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUpdateQuantity = (index) => {
    const updatedQuantityValue = editedQuantities[index] || itemData[index][1];
    axios.post('/updateItemQuantity', { item_name: itemData[index][0], quantity: updatedQuantityValue })
      .then(response => {
        const success = response.data.status;

        if (success === "true") {
          alert("Item quantity update successful!");
        } else {
          const reason = response.data.reason;
          alert("Item quantity update. " + reason);
          console.log("failure reason:", reason);
        }
      })
      .catch(error => console.error('Error updating quantity:', error));
  };

  const handleInputChange = (field, value) => {
    setNewItem(prevItem => ({ ...prevItem, [field]: value }));
  };

  const handleAddItem = () => {
    if (Object.values(newItem).every(value => value !== '')) {
      const newItemWithFlag = { ...newItem, type: newItem.type === 'food' ? 1 : 0 };

      setItemData([...itemData, Object.values(newItemWithFlag)]);

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
          console.log("failure reason:", reason);
        }
          axios.get('/Item')
            .then(response => {
              setItemData(response.data.Item);
            })
            .catch(error => console.error('Error fetching data:', error));
        })
        .catch(error => console.error('Error adding item:', error));

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
              </td>
            </tr>
          ))}
          <tr>
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
