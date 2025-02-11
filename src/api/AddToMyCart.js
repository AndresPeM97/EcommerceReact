import axiosInstance from "./Axios";

const AddToCart = async (id) => {

  try {
    const response = await axiosInstance.post(`/Cart/mycart/add/${id}`); // Hacer la solicitud GET
    console.log(response.data)
    return true
  } catch (error) {
    console.log("error")

    return false
  }
}

export default AddToCart;