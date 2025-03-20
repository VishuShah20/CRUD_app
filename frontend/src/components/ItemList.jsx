import { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import ItemForm from './ItemForm';

const API_URL = 'http://18.117.99.135:8000/items/';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  const addItem = async () => {
    try {
      const response = await axios.post(API_URL, newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async () => {
    try {
      const response = await axios.put(`${API_URL}${editingItem.id}`, newItem);
      setItems(items.map((item) => (item.id === editingItem.id ? response.data : item)));
      setEditingItem(null);
      setNewItem({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // helper functions
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price
    });
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <div className="container">
      <ItemForm
        newItem={newItem}
        setNewItem={setNewItem}
        onSubmit={editingItem ? updateItem : addItem}
        editing={!!editingItem}
      />

      <h2>Items</h2>
      <ul className="item-list">
        {items
          .filter(item => item !== undefined && item !== null)
          .map((item, index) => (
            <Item key={index} item={item} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
      </ul>
    </div>
  );
}

export default ItemList;
