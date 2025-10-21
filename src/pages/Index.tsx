import BundleContainer from "@/components/BundleContainer";
import { log } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {

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




const [fechaActivacion, setFechaActivacion] = useState('');


const [isLoggedIn, setIsLoggedIn] = useState(false);

let navigate =useNavigate();


  useEffect(() => {


   let access_token =  obtenerCookie('access_token');
    


    if(!isLoggedIn){

    

    let urlLoginTest = "https://n8n-n8n.qxzsxx.easypanel.host/webhook/verify?access_token="+access_token;
      fetch(urlLoginTest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
  .then((data) => {


    setIsLoggedIn(true);

    setFechaActivacion(data.dias_restantes);
  })
  .catch((error) => {
navigate('/login');
  })
    

   }

  }, []);


  return <BundleContainer fechaActivacion = {fechaActivacion} />;
};

export default Index;
