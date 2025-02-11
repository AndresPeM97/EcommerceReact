import { useState } from "react";

export const UserProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">Editar Perfil</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="surname"
          placeholder="Apellido"
          value={formData.surname}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Número de teléfono"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg text-purple-700 bg-purple-100 focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};