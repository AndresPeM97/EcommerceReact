import { useState, useEffect } from "react";
import axiosInstance from "../../api/Axios";
import { Header } from "../Header/Header";
import { UserProfileEdit } from "./UserProfileEdit";
import { UserProfileView } from "./UserProfileView";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/Axios";
import axios from "axios";

const UserProfile = () => {
  // Datos de ejemplo del usuario
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    phoneNumber: 0,
    Roles:[]
  });
  const [myProducts, setMyProducts] = useState([])

  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isCustomer, setIsCustomer] = useState(false)
  const navigate = useNavigate()

  // Función para obtener los detalles del producto desde la API
  const fetchProfile = async () => {
    try {
      console.log(localStorage.getItem("token"))
      const response = await axiosInstance.get("/User/profile"); // Hacer la solicitud GET
      setIsCustomer(response.data["roles"].some(role => role === "Customer"));
      setUser(response.data); // Guardar los detalles del producto en el estado
      console.log(response.data)
      if(response.data["roles"].some(role => role === "Customer"))
      {
        fetchProducts()
      }


      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los detalles del perfil'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/Product/myproducts`, {
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      }); // Hacer la solicitud GET
      console.log(response.data)
      setMyProducts(response.data);
      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  const fetchChanges = async (form) => {
    try {

      console.log(form)
      const response = await axiosInstance.put(`/User/update`, form); // Hacer la solicitud GET
      setUser(response.data); // Guardar los detalles del producto en el estado
      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axiosInstance.delete(`/User/delete`); // Hacer la solicitud GET
      setUser(response.data); // Guardar los detalles del producto en el estado
      setLoading(false); // Indicar que la carga ha terminado
      localStorage.clear();
      navigate("/")
    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axiosInstance.delete(`/Product/${id}`); // Hacer la solicitud GET
      fetchProducts()
      setLoading(false); // Indicar que la carga ha terminado
    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  }

  // Ejecutar la función fetchProduct cuando el componente se monta
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
        <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          {isEditing ? (
            <UserProfileEdit
              user={user}
              onSave={(updatedUser) => {
                fetchChanges(updatedUser);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <UserProfileView user={user} onEdit={() => setIsEditing(true)} onDelete={deleteAccount} />
          )}

          {/* Lista de productos del usuario */}
          {isCustomer && (
            <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-700 mb-4">Productos Propios</h3>
              {myProducts.length > 0 ? (
                <ul className="space-y-4">
                  {myProducts.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-lg shadow-md"
                    >
                      {/* Imagen del producto */}
                      <img
                        src={`${url}/images/${product.name}.jpg`}
                        alt={product.name}
                        className="cursor-pointer w-16 h-16 object-cover rounded-lg border border-gray-300"
                        onClick={() => navigate(`/products/${product.id}`)}
                      />

                      {/* Nombre del producto */}
                      <span className="cursor-pointer text-gray-800 flex-grow px-4"
                      onClick={() => navigate(`/products/${product.id}`)}>
                        {product.name}
                      </span>

                      {/* Botón de eliminar */}
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition-colors"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tienes productos registrados.</p>
              )}

              {/* Botón para agregar producto */}
              <button
                // onClick={addProduct}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
                onClick={() => navigate("/product/upload")}
              >
                Agregar Producto
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
