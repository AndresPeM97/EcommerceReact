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
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App/>,
)
