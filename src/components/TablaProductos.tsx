import React, { useState } from "react";
import { Package, Hash, User, Paintbrush, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import BotonVolver from "./BotonVolver";
import BotonLogout from "./BotonLogout";

// Interfaces (Mantenidas como en tu código original)
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

// Interfaz para los datos del nuevo producto del formulario
interface NuevoProductoForm {
  nombre: string;
  product_tn_id: string; // Como se lee de un input, mejor como string inicialmente
  color_border: string;
  color_discount: string;
  background_label_color: string;
  bundle_title: string;
  variants_on: boolean;
}

const TablaProductos: React.FC<TablaProductosProps> = ({ items }) => {
  let navigate = useNavigate();

  // 1. Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 2. Estado para almacenar los datos del formulario
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

  // Función para manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNuevoProductoData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Función de utilidad para obtener la cookie (Mantenida)
  function obtenerCookie(nombre: string): string | null {
    const nombreBuscado = nombre + "=";
    const cookiesArray = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreBuscado) === 0) {
        return cookie.substring(nombreBuscado.length, cookie.length);
      }
    }
    return null;
  }

  // 3. Función para enviar los datos del nuevo producto
  const añadirProducto = async (data: NuevoProductoForm) => {
    // Cierra el modal al iniciar la llamada
    setIsModalOpen(false);

    let access_token = obtenerCookie('access_token');
    console.log("Access Token:", access_token);

    let param = new URLSearchParams(window.location.search);
    let product_id_url = param.get('id'); // Nota: Este product_id no se usa en el body, pero se mantiene la lógica de obtenerlo.
    console.log("Product ID URL:", product_id_url);

    if (access_token) {
      try {
        let urlLoginTest = `https://n8n-n8n.qxzsxx.easypanel.host/webhook/producto?access_token=${access_token}&product_id=${product_id_url}`;
        
        const response = await fetch(urlLoginTest, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            producto: {
              nombre: data.nombre,
              product_tn_id: parseInt(data.product_tn_id), // Convertir a número
              color_border: data.color_border,
              color_discount: data.color_discount,
              background_label_color: data.background_label_color,
              bundle_title: data.bundle_title,
              variants_on: data.variants_on
            }
          }),
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        // Aquí podrías añadir lógica para recargar la lista de productos
        alert(`Producto "${data.nombre}" añadido con éxito!`);
      } catch (error) {
        console.error("Error al añadir producto:", error);
        alert("Hubo un error al añadir el producto.");
      }
    } else {
      alert("No se encontró el access_token. No se puede añadir el producto.");
    }
  };

  // 4. Componente Modal (simple)
  const ModalNuevoProducto: React.FC = () => {
    if (!isModalOpen) return null;

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Llama a la función de añadir con los datos del estado
        añadirProducto(nuevoProductoData);
    }
    
    return (
      // Fondo oscuro
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
        {/* Contenedor del Modal */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Cabecera del Modal */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Package className="w-5 h-5" /> Añadir Nuevo Producto
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cuerpo del Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Campo Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={nuevoProductoData.nombre}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Campo Product TN ID */}
            <div>
              <label htmlFor="product_tn_id" className="block text-sm font-medium text-gray-700">Product TN ID</label>
              <input
                id="product_tn_id"
                name="product_tn_id"
                type="number"
                value={nuevoProductoData.product_tn_id}
                onChange={handleFormChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Campos de Color (Borde, Descuento, Fondo) */}
            <div className="grid grid-cols-3 gap-4">
              {['color_border', 'color_discount', 'background_label_color'].map(key => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace('_', ' ')}</label>
                  <div className="flex items-center mt-1">
                      <input
                          id={key}
                          name={key}
                          type="color"
                          value={nuevoProductoData[key as keyof NuevoProductoForm] as string}
                          onChange={handleFormChange}
                          className="w-8 h-8 rounded-md"
                      />
                      <input
                          type="text"
                          value={nuevoProductoData[key as keyof NuevoProductoForm] as string}
                          onChange={handleFormChange}
                          name={key}
                          className="ml-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-xs"
                      />
                  </div>
                </div>
              ))}
            </div>

            {/* Campo Título Bundle */}
            <div>
              <label htmlFor="bundle_title" className="block text-sm font-medium text-gray-700">Título Bundle</label>
              <input
                id="bundle_title"
                name="bundle_title"
                type="text"
                value={nuevoProductoData.bundle_title}
                onChange={handleFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Campo Variants On (Checkbox) */}
            <div className="flex items-center space-x-2">
              <input
                id="variants_on"
                name="variants_on"
                type="checkbox"
                checked={nuevoProductoData.variants_on}
                onChange={handleFormChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="variants_on" className="text-sm font-medium text-gray-700">Variantes Activadas</label>
            </div>

            {/* Botón de Envío */}
            <div className="pt-4 border-t">
              <Button type="submit" className="w-full">
                Guardar Producto
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
// ------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="p-6">
      <div className="flex justify-between">
      
      <BotonVolver />
            <BotonLogout />
            </div>
      {/* Botón "Añadir" que abre el modal */}
      <h2 className="text-xl font-bold mb-4 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Listado de Productos cargados
        </span>
        <Button onClick={() => setIsModalOpen(true)}>Añadir</Button>
      </h2>

      {/* Tabla de Productos (Mantenida) */}
      {items.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full border border-gray-200 bg-white text-sm">
            {/* ... Encabezados de la tabla ... */}
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
                <tr onClick={(e) => irAproductos(p)} key={p.producto_id} className="hover:bg-gray-50 cursor-pointer">
                  {/* ... Filas de la tabla ... */}
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
                  <td className="border px-3 py-2">
                    {p.color_border ?? <span className="text-gray-400">-</span>}
                  </td>
                  <td className="border px-3 py-2">
                    {p.color_discount ?? <span className="text-gray-400">-</span>}
                  </td>
                  <td className="border px-3 py-2">
                    {p.background_label_color ?? <span className="text-gray-400">-</span>}
                  </td>
                  <td className="border px-3 py-2">
                    {p.bundle_title ?? <span className="text-gray-400">-</span>}
                  </td>
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

      {/* Renderiza el Modal */}
      <ModalNuevoProducto />
    </div>
  );
};

export default TablaProductos;