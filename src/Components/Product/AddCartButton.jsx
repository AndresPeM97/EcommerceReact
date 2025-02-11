import React from "react";


export const AddToCartButton = ({ onClick }) => {

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Evita que el clic propague al div padre
        onClick();
      }}
      className="cursor-pointer mt-4 w-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
    >
      Agregar al Carrito
    </button>
  );
};

