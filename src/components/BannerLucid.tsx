import React from 'react';
// Importamos los íconos de Lucide que vamos a usar
import { Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

/**
 * Componente funcional para un banner con íconos de Lucide.
 * @param {object} props
 * @param {string} props.mensaje - El texto principal a mostrar.
 * @param {string} [props.tipo='informativo'] - Define el estilo ('exito', 'advertencia', 'error', 'informativo').
 * @param {boolean} [props.conCerrar=false] - Muestra un botón para cerrar el banner.
 * @param {function} [props.alCerrar] - Función a ejecutar cuando el banner se cierra.
 */
const BannerLucid = ({  mensaje,  tipo = 'informativo', conCerrar = false, alCerrar }) => {

  // 1. Definición de estilos y contenido por tipo
  const estilosPorTipo = {
    informativo: { 
      fondo: '#E0F7FA', color: '#007BFF', Icono: Info 
    },
    advertencia: { 
      fondo: '#FFFDE7', color: '#FFA000', Icono: AlertTriangle 
    },
    error: { 
      fondo: '#FFEBEE', color: '#D32F2F', Icono: XCircle 
    },
    exito: { 
      fondo: '#E8F5E9', color: '#388E3C', Icono: CheckCircle 
    },
  };

  const { fondo, color, Icono } = estilosPorTipo["adevertencia"] || estilosPorTipo.informativo;

  // 2. Estilos principales
  const estiloBanner = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    margin: '10px 0',
    backgroundColor: fondo,
    color: color,
    borderRadius: '4px',
    borderLeft: `5px solid ${color}`, // Barra lateral para énfasis
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  // 3. Estilo del botón de cerrar
  const estiloCerrar = {
    background: 'none',
    border: 'none',
    color: color,
    cursor: 'pointer',
    fontSize: '20px',
    marginLeft: '15px',
    padding: '0'
  };

  return (
    <div style={estiloBanner}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Renderiza el ícono de Lucide */}
        <Icono size={20} style={{ marginRight: '10px' }} />
        <span>{mensaje}</span>
      </div>
      
    
    </div>
  );
};

export default BannerLucid;