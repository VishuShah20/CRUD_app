import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/items/';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  // ✅ Add new item
  const addItem = async () => {
    try {
      const response = await axios.post(API_URL, newItem, {
        headers: { 'Content-Type': 'application/json' }
      });
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // ✅ Set item for editing
  const startEdit = (item) => {
    setEditingItem(item);
    setNewItem(item);
  };

  // ✅ Update item
  const updateItem = async () => {
    try {
      const response = await axios.put(`${API_URL}${editingItem.id}`, newItem, {
        headers: { 'Content-Type': 'application/json' }
      });
      setItems(items.map((item) => (item.id === editingItem.id ? response.data : item)));
      setEditingItem(null);
      setNewItem({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // ✅ Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingItem ? "Edit Item" : "Add Item"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
      />
      {editingItem ? (
        <button onClick={updateItem}>Update Item</button>
      ) : (
        <button onClick={addItem}>Add Item</button>
      )}
    </div>
  );
}

export default ItemList;