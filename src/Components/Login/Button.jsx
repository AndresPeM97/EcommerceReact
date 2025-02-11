import React from 'react';

const Button = ({ children, type = 'button', onClick, className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white py-2 px-4 rounded-md hover:bg-gradient-to-br hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;