import { X } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SidebarMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate()
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // Cerrar el menú si se hace clic fuera
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const closeSession = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-purple-900 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 shadow-lg rounded-l-lg`}
    >
      {/* Botón de cerrar */}
      <button
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-purple-300 transition"
        onClick={onClose}
      >
        <X size={24} className="text-purple-700" />
      </button>

      {/* Contenido del menú */}
      <nav className="mt-12 p-4">
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-500 transition" onClick={() => navigate("/")}>Inicio</li>
          <li className="cursor-pointer hover:text-blue-500 transition" onClick={() => navigate("/Cart")}>
            Carrito
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition" onClick={() => navigate("/profile")}>
            Perfil
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">Categorías</li>
          <li className="cursor-pointer hover:text-red-500 transition" onClick={() => closeSession()}>
            Cerrar sesión
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
