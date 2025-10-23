import TablaProductos from '@/components/TablaProductos';
import { Cookie } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function BundlesList() {

  const productos = [
  
  ];


  const [products, setProducts] = React.useState(productos);


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

let navigate =useNavigate();








  useEffect(() => {

 const urlParams = new URLSearchParams(window.location.search);

let token = urlParams.get('token');

urlParams.delete('token');

const nuevoQueryString = urlParams.toString();
const nuevaUrlRelativa = window.location.pathname + (nuevoQueryString ? '?' + nuevoQueryString : '');

window.history.replaceState({}, '', nuevaUrlRelativa);


   let access_token =  obtenerCookie('access_token');
   let tiendanube_token =  obtenerCookie('tiendanube_token');



   if(tiendanube_token){
    
     token = tiendanube_token
   }



  fetch('https://n8n-n8n.qxzsxx.easypanel.host/webhook/tnid?token='+ token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
        document.cookie = ('tiendanube_token='+token);
        document.cookie = ('tiendanube_user_id='+data[0].user_id);


        fetch("https://n8n-n8n.qxzsxx.easypanel.host/webhook/adduseridtn?access_token="+access_token+"&user_tn_id="+data[0].user_id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

    })
    .catch((error) => {
      console.error('Error:', error);
    });




    
    
   if(access_token){
    let urlLoginTest = "https://n8n-n8n.qxzsxx.easypanel.host/webhook/products?access_token="+access_token;
      fetch(urlLoginTest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
  .then((data) => {

  
    setProducts(data[0].productos);

  })
    
   }else{
    navigate("/login")
   }



  }, []);



  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      
      <TablaProductos items={products} />
    </div>
  )
}

export default BundlesList
