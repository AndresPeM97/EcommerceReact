import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'

import './index.css'
import { Login } from './Components/Login/Login.jsx'
import { Products } from './Components/Product/Products.jsx'
import ProductDetail from './Components/Product/ProductDetail.jsx'
import UserProfile from './Components/Login/UserProfile.jsx'
import { Header } from './Components/Header/Header.jsx'
import Cart from './Components/Product/Cart.jsx'
import ProtectedRoute from "./ProtectedRoute"; // Importa el protector de rutas
import { SignUpUser } from './Components/Login/SignUpUser.jsx'
import ProductUploadForm from './Components/Login/ProductUploadForm.jsx'

const App = () => {
  const token = localStorage.getItem("token"); // O sessionStorage

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/register/user" element={<SignUpUser/>} />
          <Route path="/register/customer" element={<SignUpUser/>} />
          <Route path="/product/upload" element={<ProtectedRoute><ProductUploadForm /></ProtectedRoute>} />

          {/* Redirigir raíz dependiendo del token */}
          <Route path="/" element={token ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </StrictMode>
  );
};

export default App;
