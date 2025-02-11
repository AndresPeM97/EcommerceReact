import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react"; // Icono de menú
import SidebarMenu from "./SideBarMenu";

export const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // if (onSearch) onSearch(searchTerm);
  };

  return (
    <>
      <header className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-white p-4 flex items-center justify-between shadow-lg rounded-lg">
        {/* Nombre de la tienda */}
        <h1 
          className="text-2xl font-bold cursor-pointer text-purple-700"
          onClick={() => navigate("/")}
        >
          Mi Tienda
        </h1>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="flex flex-1 mx-4 max-w-md bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 rounded-l-lg text-black outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-purple-500 px-4 py-2 rounded-r-lg hover:bg-purple-600"
          >
            Buscar
          </button>
        </form>

        {/* Botón de menú */}
        <button 
          className="p-2 rounded-lg hover:bg-purple-300 transition"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
