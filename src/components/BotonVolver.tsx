import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'; // Asumiendo que 'ui/button' es tu componente de botón
import { ArrowLeft } from 'lucide-react';

/**
 * Componente de botón para navegar a la página anterior
 */
const BotonVolver: React.FC = () => {
  const navigate = useNavigate();

  // La función navigate(-1) simula el botón "Atrás" del navegador.
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      onClick={handleGoBack} 
      variant="outline" // Un estilo que contraste con el primario (ajusta según tu 'ui/button')
      className="flex items-center gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver atrás
    </Button>
  );
};

export default BotonVolver;