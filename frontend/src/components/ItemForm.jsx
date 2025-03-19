import PropTypes from 'prop-types';

function ItemForm({ newItem, setNewItem, onSubmit, editing }) {
  return (
    <div className="item-form">
      <h3>{editing ? "Edit Item" : "Add Item"}</h3>
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
      <button onClick={onSubmit}>{editing ? "Update" : "Add"} Item</button>
    </div>
  );
}

ItemForm.propTypes = {
  newItem: PropTypes.object.isRequired,
  setNewItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default ItemForm;
