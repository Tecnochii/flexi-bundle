import React, { useEffect } from 'react';
import { Package, ChevronDown } from 'lucide-react'; // Importamos los íconos

/**
 * Un componente <select> para mostrar una lista de productos.
 * Estilizado para parecerse a un componente de Lucid/shadcn.
 *
 * @param {Object[]} products - El array de productos (como el que pasaste).
 * @param {string} value - El ID del producto actualmente seleccionado.
 * @param {function} onChange - La función a llamar cuando la selección cambia.
 * @param {string} [label] - Un label opcional para el select.
 */
function ProductSelect({ products, value, onChange, label = "Selecciona el producto de tu bundle"}) {








  return (
    <div className='flex flex-col mt-10 gap-2'>
      
      {/* --- Label Estilizado --- */}
      {/* Le damos un estilo más sutil y agregamos un ícono */}
      <label 
        htmlFor="product-select" 
        className="flex text-lg items-center gap-2  font-medium text-gray-800"
      >
        <Package className="h-4 w-4 text-gray-900" />
        {label}
      </label>
      
      {/* --- Contenedor Relativo --- */}
      {/* Necesario para posicionar el ícono de la flecha */}
      <div className="relative">

        {/* --- Select Estilizado --- */}
        <select 
          id="product-select" 
          value={value} 
          onChange={onChange}
          // --- Clases de Tailwind ---
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
          
          {/* Mapeo de productos (sin cambios) */}
          {Array.isArray(products) && products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name.es}
            </option>
          ))}
        </select>

        {/* --- Ícono de Flecha (Chevron) --- */}
        {/* Posicionado de forma absoluta sobre el select */}
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