// TablaProductos.tsx
import React, { useState } from "react";
import { Package, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import BotonVolver from "./BotonVolver";
import BotonLogout from "./BotonLogout";
// ✅ Importamos el Modal externalizado
import ModalNuevoProducto from "./ModalNuevoProducto"; 

// --- Interfaces se mantienen iguales ---
interface Producto {
  producto_id: number;
  nombre: string;
  product_tn_id: number;
  usuario_id: number;
  color_border: string | null;
  color_discount: string | null;
  background_label_color: string | null;
  bundle_title: string | null;
  variants_on: boolean | null;
}

interface TablaProductosProps {
  items: Producto[];
}

interface NuevoProductoForm {
  nombre: string;
  product_tn_id: string; // Se mantiene como string para el input de texto
  color_border: string;
  color_discount: string;
  background_label_color: string;
  bundle_title: string;
  variants_on: boolean;
}
// ----------------------------------------

const TablaProductos: React.FC<TablaProductosProps> = ({ items }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoProductoData, setNuevoProductoData] = useState<NuevoProductoForm>({
    nombre: "Nuevo Producto",
    product_tn_id: "296936138",
    color_border: "#000000",
    color_discount: "#000000",
    background_label_color: "#000000",
    bundle_title: "Gana comprando por cantidad",
    variants_on: false,
  });

  const irAproductos = (p: Producto) => {
    navigate(`/generador?id=${p.producto_id}`);
  };

  // ✅ Manejo genérico del cambio en inputs (SE MANTIENE IGUAL)
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNuevoProductoData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function obtenerCookie(nombre: string): string | null {
    const nombreBuscado = nombre + "=";
    const cookiesArray = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreBuscado) === 0) {
        return cookie.substring(nombreBuscado.length, cookie.length);
      }
    }
    return null;
  }

  const añadirProducto = async (data: NuevoProductoForm) => {
    setIsModalOpen(false);
    let access_token = obtenerCookie("access_token");
    let param = new URLSearchParams(window.location.search);
    let product_id_url = param.get("id");

    if (access_token) {
      try {
        let url = `https://n8n-n8n.qxzsxx.easypanel.host/webhook/producto?access_token=${access_token}&product_id=${product_id_url}`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            producto: {
              nombre: data.nombre,
              product_tn_id: parseInt(data.product_tn_id), // Convertimos a número antes de enviar
              color_border: data.color_border,
              color_discount: data.color_discount,
              background_label_color: data.background_label_color,
              bundle_title: data.bundle_title,
              variants_on: data.variants_on,
            },
          }),
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        // Si tienes una función para refrescar la lista, llámala aquí
        window.location.reload()
      } catch (error) {
        console.error("Error al añadir producto:", error);
        alert("Hubo un error al añadir el producto.");
      }
    } else {
      alert("No se encontró el access_token. No se puede añadir el producto.");
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between">
        <BotonVolver />
        <BotonLogout />
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Listado de Productos cargados
        </span>
        <Button onClick={() => setIsModalOpen(true)}>Añadir</Button>
      </h2>

      {items.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full border border-gray-200 bg-white text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border text-left"># ID</th>
                <th className="px-3 py-2 border text-left">Nombre</th>
                <th className="px-3 py-2 border text-left">Product TN ID</th>
                <th className="px-3 py-2 border text-left">Usuario</th>
                <th className="px-3 py-2 border text-left">Color Borde</th>
                <th className="px-3 py-2 border text-left">Color Descuento</th>
                <th className="px-3 py-2 border text-left">Fondo Label</th>
                <th className="px-3 py-2 border text-left">Título Bundle</th>
                <th className="px-3 py-2 border text-left">Variantes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.producto_id} onClick={() => irAproductos(p)} className="hover:bg-gray-50 cursor-pointer">
                  <td className="border px-3 py-2">{p.producto_id}</td>
                  <td className="border px-3 py-2 flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-600" />
                    {p.nombre}
                  </td>
                  <td className="border px-3 py-2">{p.product_tn_id}</td>
                  <td className="border px-3 py-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {p.usuario_id}
                  </td>
                  <td className="border px-3 py-2">{p.color_border ?? <span className="text-gray-400">-</span>}</td>
                  <td className="border px-3 py-2">{p.color_discount ?? <span className="text-gray-400">-</span>}</td>
                  <td className="border px-3 py-2">{p.background_label_color ?? <span className="text-gray-400">-</span>}</td>
                  <td className="border px-3 py-2">{p.bundle_title ?? <span className="text-gray-400">-</span>}</td>
                  <td className="border px-3 py-2">
                    {p.variants_on ? (
                      <span className="text-green-600 font-semibold">Sí</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No hay productos</p>
      )}

      {/* ✅ Uso del componente Modal externalizado */}
      <ModalNuevoProducto 
          isModalOpen={isModalOpen}
          nuevoProductoData={nuevoProductoData}
          onClose={() => setIsModalOpen(false)}
          onFormChange={handleFormChange}
          onSubmit={añadirProducto} // Le pasamos la función de envío
      />
    </div>
  );
};

export default TablaProductos;