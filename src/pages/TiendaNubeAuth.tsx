// src/pages/TiendaNubeAuth.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TiendaNubeAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



const handleInstallApp = () => {
  setLoading(true);
  
  const CLIENT_ID = 22423;
  const REDIRECT_URI = 'https://n8n-n8n.qxzsxx.easypanel.host/webhook/callback';
  




  // ✅ URL corregida
  const authUrl = `https://www.tiendanube.com/apps/${CLIENT_ID}/authorize?&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
  
  window.location.href = authUrl;
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Conectar con Tienda Nube
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Para usar TecnoBundles, necesitas conectar tu tienda de Tienda Nube
        </p>
        <button
          onClick={handleInstallApp}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Conectando...' : 'Conectar mi Tienda'}
        </button>
      </div>
    </div>
  );
};

export default TiendaNubeAuth;



