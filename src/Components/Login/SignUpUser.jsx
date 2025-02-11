import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/Axios";
import axios from "axios";

const countries = ["México", "Estados Unidos", "España", "Argentina", "Colombia", "Chile", "Perú"];

export const SignUpUser = () => {
  const location = useLocation();
  const isSeller = location.pathname.includes("customer"); // Detecta si la URL tiene "vendedor"
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit(formData);
  };

  const handleRegisterSubmit = async (credentials) => {
    try {
      console.log(credentials)
      let url = isSeller ? "customer" : "user"
      const response = await axiosInstance.post(`/User/register/${url}`, credentials);

      console.log('Registro exitoso:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      navigate('/login');

    } catch (error) {
      if (axios.isCancel(error)) {

        console.log('Solicitud cancelada:', error.message);

      } else {

        console.error('Error:', error.message);

      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-purple-300">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
          Registro de {isSeller ? "Vendedor" : "Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="surname"
            placeholder="Apellido"
            value={formData.surname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Selecciona tu país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="text-pink-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
