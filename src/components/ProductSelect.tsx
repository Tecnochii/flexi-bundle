import React, { useEffect, useState } from 'react';
// Importamos los íconos necesarios, incluyendo 'Search'
import { Package, ChevronDown, Search } from 'lucide-react';

/**
 * Un componente <select> para mostrar una lista de productos,
 * con un campo de filtro de texto.
 * Estilizado para parecerse a un componente de Lucid/shadcn.
 *
 * @param {Object[]} products - El array de productos.
 * @param {string} value - El ID del producto actualmente seleccionado.
 * @param {function} onChange - La función a llamar cuando la selección cambia.
 * @param {string} [label] - Un label opcional para el select.
 */
function ProductSelect({ products, value, onChange, label = "Selecciona el producto de tu bundle"}) {

  // --- NUEVO: Estado para el filtro ---
  // Guardamos el término de búsqueda que el usuario escribe
  const [filtro, setFiltro] = useState('');

  // --- Lógica para el valor por defecto (sin cambios) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id');

    if (!urlId || value) {
      return;
    }

    if (Array.isArray(products)) {
      const stringToFind = `<script src="https://n8n.tecnobundles.com/webhook/sendid?product=${urlId}"></script>`;

      
      const matchingProduct = products.find(
        (p) => p.description && p.description.es && p.description.es.includes(stringToFind)
      );
      
      if (matchingProduct) {
        onChange({ target: { value: matchingProduct.id } });
      }
    }
  }, [products, value, onChange]);

  // --- NUEVO: Lógica de filtrado ---
  // Filtramos la lista de productos ANTES de pasarla al select
  // Comprobamos que 'products' sea un array antes de filtrar
  const productosFiltrados = (Array.isArray(products) ? products : []).filter(
    (product) =>
      // Aseguramos que el producto y su nombre existan
      product.name &&
      product.name.es &&
      // Comparamos en minúsculas para que el filtro no sea sensible
      product.name.es.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className='flex flex-col mt-10 gap-2'>
      
      {/* --- NUEVO: Input de Filtro --- */}
      <label 
        htmlFor="product-filter" 
        className="flex text-lg items-center gap-2 font-medium text-gray-800"
      >
        <Search className="h-4 w-4 text-gray-900" />
        Filtrar producto
      </label>
      <div className="relative mb-4"> {/* Margen inferior para separar del select */}
        <input
          type="text"
          id="product-filter"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Escribe el nombre del producto..."
          className="
            text-lg
            appearance-none
            block
            w-full
            bg-white
            border
            border-gray-300
            rounded-md
            py-2 pl-3 pr-3
            text-base
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      {/* --- Label Estilizado para el Select (sin cambios) --- */}
      <label 
        htmlFor="product-select" 
        className="flex text-lg items-center gap-2 font-medium text-gray-800"
      >
        <Package className="h-4 w-4 text-gray-900" />
        {label}
      </label>
      
      {/* --- Contenedor Relativo (sin cambios) --- */}
      <div className="relative">

        {/* --- Select Estilizado (sin cambios) --- */}
        <select 
          id="product-select" 
          value={value || ''} 
          onChange={onChange}
          className="
            text-lg
            appearance-none
            block
            w-full
            bg-white
            border
            border-gray-300
            rounded-md
            py-2 pl-3 pr-8
            text-base
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        >
          {/* Opción por defecto */}
          <option value="">-- Elige una opción --</option>
          
          {/* --- MODIFICADO: Mapeo de productos filtrados --- */}
          {/* Usamos 'productosFiltrados' en lugar de 'products' */}
          {productosFiltrados.map(product => (
            <option key={product.id} value={product.id}>
              {product.name.es}
            </option>
          ))}
        </select>

        {/* --- Ícono de Flecha (Chevron) (sin cambios) --- */}
        <div className="
          pointer-events-none 
          absolute 
          inset-y-0 
          right-0 
          flex 
          items-center 
          px-2 
          text-gray-500
        ">
          <ChevronDown className="h-4 w-4" />
        </div>

      </div> {/* Fin del contenedor relativo */}
    </div>
  );
}

export default ProductSelect;
