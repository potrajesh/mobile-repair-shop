// Page1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    navigate('/Page2', { state: { selectedItems } });
  };

  return (
    <div>
      <h2>Select Items</h2>
      {items.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              value={item}
              onChange={() => handleSelect(item)}
              checked={selectedItems.includes(item)}
            />
            {item}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Go to Page 2</button>
    </div>
  );
};

export default Page1;
