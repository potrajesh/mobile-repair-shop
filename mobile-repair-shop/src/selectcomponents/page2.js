// Page2.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Page2 = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  return (
    <div>
      <h2>Selected Items</h2>
      {selectedItems.length > 0 ? (
        <ul>
          {selectedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No items selected.</p>
      )}
    </div>
  );
};

export default Page2;
