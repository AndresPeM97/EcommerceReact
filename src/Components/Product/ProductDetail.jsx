import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../../api/Axios"
import { AddToCartButton } from './AddCartButton';
import AddToCart from "../../api/AddToMyCart"
import { Header } from '../Header/Header';
import { url } from '../../api/Axios';

const ProductDetail = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState(null); // Estado para almacenar los detalles del producto
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para obtener los detalles del producto desde la API
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/Product/${id}`); // Hacer la solicitud GET
      setProduct(response.data); // Guardar los detalles del producto en el estado
      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  // Ejecutar la función fetchProduct cuando el componente se monta
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-300">Cargando detalles del producto...</p>
      </div>
    );
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  // Mostrar los detalles del producto
  return (
    <>
      <Header></Header>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">{product.name}</h2>

          {/* Imagen del producto */}
          <div className="flex justify-center mb-6">
            <img 
              src={`${url}/images/${product.name}.jpg`}
              alt={product.name} 
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-4">
            <p className="text-purple-900">
              <span className="font-semibold">Descripción:</span> {product.description}
            </p>
            <p className="text-purple-900">
              <span className="font-semibold">Precio:</span> <span className="text-pink-600 font-bold">${product.price}</span>
            </p>
            <p className="text-purple-900">
              <span className="font-semibold">Cantidad disponible:</span> {product.quantity}
            </p>
            <p className="text-purple-900">
              <span className="font-semibold">Calificación:</span> ⭐ {product.rate} / 5
            </p>
            <p className="flex justify-center">
              <AddToCartButton 
                onClick={() => AddToCart(id)} 
                className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 hover:bg-gradient-to-br hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-md shadow-md transition"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;