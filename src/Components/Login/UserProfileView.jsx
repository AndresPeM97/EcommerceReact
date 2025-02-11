
export const UserProfileView = ({ user, onEdit, onDelete }) => (
  <div className="p-6 rounded-lg shadow-md bg-white">
    <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">Perfil de Usuario</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold text-purple-700">Nombre:</h3>
        <p className="text-gray-700">{user.name}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-purple-700">Apellido:</h3>
        <p className="text-gray-700">{user.surname}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-purple-700">Correo electrónico:</h3>
        <p className="text-gray-700">{user.email}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-purple-700">País:</h3>
        <p className="text-gray-700">{user.country}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-purple-700">Número de teléfono:</h3>
        <p className="text-gray-700">{user.phoneNumber}</p>
      </div>
    </div>

    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={onEdit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
      >
        Editar perfil
      </button>

      <button
        onClick={() => {
          if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
            onDelete();
          }
        }}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
      >
        Borrar cuenta
      </button>
    </div>
  </div>
);