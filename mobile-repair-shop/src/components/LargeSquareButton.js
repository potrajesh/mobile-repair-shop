// components/LargeSquareButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LargeSquareButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/outlist');
  };

  const buttonStyle = {
    width: '200px', // Adjust width as needed
    height: '200px', // Adjust height as needed
    fontSize: '24px', // Font size for the button text
    backgroundColor: '#007bff', // Bootstrap primary color
    color: '#ffffff', // White text color
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto', // Center the button
  };

  return (
    <button style={buttonStyle} onClick={handleButtonClick}>
      Open Outlist Page
    </button>
  );
};

export default LargeSquareButton;
