// ============================================
// src/utils/tiendanubeApi.ts

import { log } from "console";

interface TiendaNubeConfig {
  userId: string;
  accessToken: string;
}

// Obtener configuración de cookies
export const getTiendaNubeConfig =  ():  TiendaNubeConfig | null => {
 function obtenerCookie(nombre) {
    // 1. Prepara el nombre a buscar (asegura el signo = al final)
    const nombreBuscado = nombre + "=";

    // 2. Decodifica la cadena completa de cookies para manejar caracteres especiales
    //    y la divide en un array de cookies individuales
    const cookiesArray = decodeURIComponent(document.cookie).split(';');


    // 3. Itera sobre cada elemento (cookie) en el array
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];

        // 4. Elimina los espacios en blanco iniciales (del separador '; ')
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        // 5. Comprueba si el elemento actual comienza con el nombre buscado
        if (cookie.indexOf(nombreBuscado) === 0) {
            // 6. Si coincide, devuelve el valor (la parte que sigue a nombreBuscado)
            return cookie.substring(nombreBuscado.length, cookie.length);
        }
    }

    // 7. Si el bucle termina sin encontrar la cookie, devuelve null
    return null;
}


    







  const userId = obtenerCookie('tiendanube_user_id');
  const accessToken = obtenerCookie('tiendanube_token');
  if ( !accessToken) return null;

  if (!userId || !accessToken) return null;

  return { userId, accessToken };
};

// Hacer llamadas a la API de Tienda Nube
export const tiendaNubeAPI = async (endpoint: string, options: RequestInit = {}) => {
  const config = getTiendaNubeConfig();
  
  if (!config) {
    throw new Error('No hay sesión activa de Tienda Nube');
  }




  

  

//   const url = `https://api.tiendanube.com/v1/${config.userId}${endpoint}`;
  
//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       'Authentication': `bearer ${config.accessToken}`,
//       'User-Agent': 'TecnoBundles (ema72x@gmail.com)',
//       'Content-Type': 'application/json',
//       ...options.headers,
//     }
//   });



 const response = await fetch("https://n8n-n8n.qxzsxx.easypanel.host/webhook/productstn?user_id="+config.userId+"&endpoint="+endpoint+"&access_token="+config.accessToken, 
    { method: "GET" })
    .then(response => response.json())
    .then(json =>  json)
    .catch(err => {



      console.log(err);
      
// document.cookie = "tiendanube_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// document.cookie = "tiendanube_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         window.location.reload();

    });

;


return response


 
};

// Obtener productos
export const getProducts = async () => {
  return tiendaNubeAPI('/products');
};

// Obtener un producto específico
export const getProduct = async (productId: string) => {
  return tiendaNubeAPI(`/products/${productId}`);
};

// Crear un script en el producto
export const createProductScript = async (productId: string, src: string) => {
  return tiendaNubeAPI('/scripts', {
    method: 'POST',
    body: JSON.stringify({
      src,
      event: 'onload',
      where: 'product',
      product_id: productId
    })
  });
};