import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Icono de cerrar sesión
import { Button } from './ui/button'; // Asumiendo que 'ui/button' es tu componente de botón

/**
 * Componente de botón para Cerrar Sesión (Logout)
 */
const BotonLogout: React.FC = () => {
  const navigate = useNavigate();

  // Función para eliminar una cookie
  const eliminarCookie = (nombre: string) => {
    // Establece la cookie con una fecha de expiración en el pasado
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie '${nombre}' eliminada.`);
  };

  // Manejador del evento de cerrar sesión
  const handleLogout = () => {
    // 1. Eliminar la cookie de autenticación
    eliminarCookie('access_token');
    
    // Si tuvieras un 'user_id' o 'session_id' también lo eliminarías aquí:
    // eliminarCookie('user_id'); 

    // Opcional: Llamada a un endpoint de backend para invalidar la sesión del lado del servidor (muy recomendado)
    // fetch('/api/logout', { method: 'POST' }); 

    // 2. Redirigir al usuario a la página de inicio de sesión (o a la raíz '/')
    navigate('/login'); 
    // Si la ruta de inicio de sesión es diferente, cámbiala.
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="ghost" // Estilo discreto, común para botones de logout
      className="flex items-center gap-2 text-red-600 hover:bg-red-50"
    >
      <LogOut className="w-4 h-4" />
      Cerrar Sesión
    </Button>
  );
};

export default BotonLogout;