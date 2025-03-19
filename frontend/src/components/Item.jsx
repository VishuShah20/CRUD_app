import PropTypes from 'prop-types';

function Item({ item, onEdit, onDelete }) {
  if (!item) {
    return <li className="item">Invalid Item</li>;
  }

  return (
    <li className="item">
      <span>{item.name} - ${item.price.toFixed(2)}</span>
      <div>
        <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Item;