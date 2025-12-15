import TablaProductos from "@/components/TablaProductos";
import { Cookie } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTiendaNubeConfig,
  getProduct,
  getProducts,
} from "@/utils/tiendanubeApi";
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BotonVolver from "@/components/BotonVolver";
import BotonLogout from "@/components/BotonLogout";



function BundlesList() {
  const productos = [];

  const [products, setProducts] = React.useState(productos);

  function obtenerCookie(nombre) {
    // 1. Prepara el nombre a buscar (asegura el signo = al final)
    const nombreBuscado = nombre + "=";

    // 2. Decodifica la cadena completa de cookies para manejar caracteres especiales
    //    y la divide en un array de cookies individuales
    const cookiesArray = decodeURIComponent(document.cookie).split(";");

    // 3. Itera sobre cada elemento (cookie) en el array
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];

      // 4. Elimina los espacios en blanco iniciales (del separador '; ')
      while (cookie.charAt(0) === " ") {
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

  let navigate = useNavigate();

  const eliminarCookie = (nombre: string) => {
    // Establece la cookie con una fecha de expiración en el pasado
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie '${nombre}' eliminada.`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    let token = urlParams.get("token");

    urlParams.delete("token");

    const nuevoQueryString = urlParams.toString();
    const nuevaUrlRelativa =
      window.location.pathname +
      (nuevoQueryString ? "?" + nuevoQueryString : "");

    window.history.replaceState({}, "", nuevaUrlRelativa);

    let access_token = obtenerCookie("access_token");
    let tiendanube_token = obtenerCookie("tiendanube_token");

    if (tiendanube_token) {
      token = tiendanube_token;
    }

    fetch("https://n8n.tecnobundles.com/webhook/tnid?token=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.cookie = "tiendanube_token=" + token;
        document.cookie = "tiendanube_user_id=" + data[0].user_id;

        fetch(
          "https://n8n.tecnobundles.com/webhook/adduseridtn?access_token=" +
            access_token +
            "&user_tn_id=" +
            data[0].user_id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {



            console.log(data);


       

            if (data.status == 403) {
                        eliminarCookie("tiendanube_token");
            eliminarCookie("tiendanube_user_id");
             alert("La cuenta ya fue vinculada con otra tienda.");
            }else{
              alert("Cuenta conectada con exito.");
            }



          })
          .catch((error) => {
       

          });
      })
      .catch((error) => {
        console.error("Error:", error.status);
      });

    if (access_token) {
      let urlLoginTest =
        "https://n8n.tecnobundles.com/webhook/products?access_token=" +
        access_token;
      fetch(urlLoginTest, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data[0].productos);
        });
    } else {
      navigate("/login");
    }
  }, []);

const handleGoToDashboard = () => {
  navigate('/dashboard');
};


  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      
      <div className="container mx-auto px-4 py-8">
           <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-4">
      <BotonVolver />
      {/* <Button 
        onClick={handleGoToDashboard}
        variant="default"
        className="flex items-center gap-2"
      >
        <BarChart3 className="w-4 h-4" />
        Ver Dashboard
      </Button> */}
    </div>
    <BotonLogout />
  </div>
      <TablaProductos items={products} />

      </div>
    </div>
  );
}

export default BundlesList;
