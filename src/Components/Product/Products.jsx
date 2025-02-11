import React, { useState, useEffect } from 'react';
import axiosInstance from "../../api/Axios"
import { useNavigate } from 'react-router-dom';
import { AddToCartButton } from './AddCartButton';
import AddToCart from "../../api/AddToMyCart"
import { Header } from '../Header/Header';
import { url } from '../../api/Axios';

export const Products = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  const validateAddToCart = async (id) => {
    try {
      let result = await AddToCart(id); // ← Ahora devuelve true o false correctamente
      console.log(result);
  
      if (result === false) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error en validateAddToCart:", error);
    }
  };
  

  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/Product'); // Hacer la solicitud GET
      setProducts(response.data); // Guardar los productos en el estado
      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los productos'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
      localStorage.clear()
      navigate("/")
    }
  };

  // Ejecutar la función fetchProducts cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Mostrar la lista de productos
  return (
    <>
      <Header></Header>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-8 rounded-lg shadow-lg w-full max-w">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">Lista de Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-purple-50 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {/* Imagen del producto */}
                <img
                  src={`${url}/images/${product.name}.jpg`} // Asegúrate de tener un campo 'image' en tu objeto producto
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-4"
                />

                <h3 className="text-xl font-semibold text-purple-900 mb-2">{product.name}</h3>
                <p className="text-purple-700 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-pink-600">${product.price}</p>

                <AddToCartButton
                  onClick={(e) => {
                    validateAddToCart(product.id);
                  }}
                  className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 hover:bg-gradient-to-br hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-md shadow-md transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};