import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null; // No renderizar si no hay mensaje

  return (
    <div className="text-purple-600 text-center mb-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-2 rounded-md">
      {message}
    </div>

  );
};

export default ErrorMessage;