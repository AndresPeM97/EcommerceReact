import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const ProductUploadForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !quantity || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Price', price);
    formData.append('Description', description);
    formData.append('Quantity', quantity);
    formData.append('imageFile', image);

    try {
      const response = await axios.post('http://localhost:5006/api/Product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });

      navigate("/profile")

      if (response.status === 201) {
        alert('Product uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product.');
    }
  };

  return (
    <>
    <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
        <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Subir Nuevo Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 font-semibold">Nombre del Producto:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 mt-2 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold">Precio:</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-3 mt-2 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold">Descripción:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full p-3 mt-2 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold">Cantidad:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full p-3 mt-2 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold">Imagen del Producto:</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  required
                  className="w-full p-3 mt-2 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
                >
                  Subir Producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductUploadForm;
