// ============================================
// src/pages/TiendaNubeCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TiendaNubeCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      setError('No se recibió código de autorización');
      return;
    }

    // Enviar el código a tu backend (n8n) para intercambiarlo por un access_token
    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch('https://n8n-n8n.qxzsxx.easypanel.host/webhook/tiendanube-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (data.access_token && data.user_id) {
          // Guardar el access_token en una cookie
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 365); // 1 año
          const expires = "expires=" + expiryDate.toUTCString();
          
          document.cookie = `tiendanube_token=${data.access_token}; ${expires}; Path=/; SameSite=Lax; Secure`;
          document.cookie = `tiendanube_user_id=${data.user_id}; ${expires}; Path=/; SameSite=Lax; Secure`;
          
          // Redirigir a la lista de productos
          navigate('/list');
        } else {
          setError('Error al obtener el token de acceso');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error al conectar con el servidor');
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/tiendanube-auth')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Volver a intentar
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Conectando...</h2>
            <p className="text-gray-600">Por favor espera mientras conectamos tu tienda</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TiendaNubeCallback;