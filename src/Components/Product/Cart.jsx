import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Header } from "../Header/Header";
import axiosInstance from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/Axios";

const Cart = () => {
  // Datos de ejemplo del carrito
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar errores
  const [UpdateFlag, setUpdateFlag] = useState("")
  const navigate = useNavigate()

  // Función para obtener los detalles del producto desde la API
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/Cart/mycart`); // Hacer la solicitud GET

      // console.log(response.data)
      setCartItems(response.data); // Guardar los detalles del producto en el estado
      setLoading(false); // Indicar que la carga ha terminado

      const newTotal = response.data.reduce((acc, item) => acc + item.total, 0);
      setTotal(newTotal); // Actualizar el estado de total

      console.log("XD")

    } catch (error) {
      setError('No se pudo obtener tu carrito'); // Manejar errores
      setCartItems([])
      setTotal(0)
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  const updateCartItem = (updatedItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === updatedItem.productId ? updatedItem : item
      )
    );

    console.log(updatedItem)
  };  

  const changeQuantity = async (productId, add) => {
    try {
      let response = ""
      if(add === true){
        response = await axiosInstance.post(`/Cart/mycart/add/${productId}`); // Hacer la solicitud GET
      }else{
        response = await axiosInstance.post(`/Cart/mycart/decrease/${productId}`); // Hacer la solicitud GET
      }

      updateCartItem(response.data)

    } catch (error) {
      setError('Error al cargar los detalles del producto'); // Manejar errores
      setLoading(false); // Indicar que la carga ha terminado
    }
  };

  useEffect(() => {

    fetchProduct()
    console.log(JSON.stringify(cartItems))

  }, [JSON.stringify(cartItems)])

  return (
    <>
      <Header></Header>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">Carrito de Compras</h2>

          {/* Lista de productos en formato vertical */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-br hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-300"
              >
                {/* Imagen del producto */}
                <img
                  src={`${url}/images/${item.name}.jpg`}
                  alt={item.name}
                  className="cursor-pointer w-20 h-20 object-cover rounded-lg shadow-md mr-4"
                  onClick={() => navigate(`/products/${item.productId}`)}
                />

                {/* Información del producto */}
                <div className="flex-grow">
                  <h3 className="cursor-pointer text-xl font-semibold text-purple-900"
                    onClick={() => navigate(`/products/${item.productId}`)}
                  >{item.name}</h3>
                  <p className="text-purple-800">
                    Precio: <span className="font-bold text-pink-600">${item.price}</span>
                  </p>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center">
                  <button
                    onClick={() => changeQuantity(item.productId, false)}
                    className="p-2 bg-purple-300 rounded-full hover:bg-purple-400 transition"
                  >
                    <Minus className="w-5 h-5 text-purple-900" />
                  </button>

                  <span className="mx-4 text-purple-900 text-lg">{item.quantity}</span>

                  <button
                    onClick={() => changeQuantity(item.productId, true)}
                    className="p-2 bg-purple-300 rounded-full hover:bg-purple-400 transition"
                  >
                    <Plus className="w-5 h-5 text-purple-900" />
                  </button>
                </div>

                {/* Total alineado a la derecha */}
                <p className="text-lg font-bold text-blue-600 ml-6">${item.total}</p>
              </div>
            ))}
          </div>

          {/* Tarjeta de Total */}
          <div className="mt-8 bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 p-6 rounded-lg shadow-md text-purple-900">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Total:</h3>
              <p className="text-2xl font-bold text-blue-600">${total}</p>
            </div>
            <button className="w-full mt-4 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-white py-2 rounded-lg hover:bg-gradient-to-br hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;