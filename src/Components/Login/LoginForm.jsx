import React, { useState } from 'react';
import Button from "./Button"

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Validación básica
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // Crear el objeto credentials
    const credentials = {
      email,
      password,
    };
    // Llamar a la función onSubmit (proporcionada por el componente padre)
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
          className="w-full px-4 py-2 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border border-purple-300 rounded-md text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-purple-700 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          className="w-full px-4 py-2 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border border-purple-300 rounded-md text-purple-800 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {error && <p className="text-pink-500 text-center mb-6">{error}</p>}
      <Button type="submit" className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-md shadow-md transition">
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;