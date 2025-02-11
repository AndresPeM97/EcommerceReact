import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/Axios"
import LoginForm from './LoginForm'
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [cancelToken] = useState(axios.CancelToken.source());
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      // Cancelar la solicitud cuando el componente se desmonta
      cancelToken.cancel('Solicitud cancelada');
    };
  }, [cancelToken]);

  const handleLoginSubmit = async (credentials) => {
    try {
      
      console.log("XD")
      const response = await axiosInstance.post('/User/login', credentials);

      console.log('Login exitoso:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      navigate('/products');

    } catch (error) {
      if (axios.isCancel(error)) {

        console.log('Solicitud cancelada:', error.message);

      } else {
        setError("El usuario no existe")
        console.error('Error:', error.message);

      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-purple-300">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">Iniciar Sesión</h2>
        {error ? (
          <h1 className='text-l font-bold text-center text-purple-700 mb-8'>{error}</h1>
        ) :
        (<></>)
        }
        <LoginForm onSubmit={handleLoginSubmit} />

        <div className="mt-6 text-center">
          <button href="/forgot-password" className="cursor-pointer text-sm text-purple-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
          <span className="mx-2 text-gray-400">|</span>
          <button onClick={() => navigate("/register/user")} className="cursor-pointer text-sm text-purple-500 hover:underline ">
            Regístrate
          </button>
        </div>

        <div className="mt-4 text-center">
          <button onClick={() => navigate("/register/customer")} className="cursor-pointer text-sm font-semibold text-pink-600 hover:underline">
            ¿Quieres ser vendedor?
          </button>
        </div>
      </div>
    </div>
  );
};