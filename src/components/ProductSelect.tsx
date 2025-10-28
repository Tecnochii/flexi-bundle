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

  // --- Lógica para el valor por defecto ---
  // Este useEffect se ejecuta cuando el componente se monta
  // o cuando la lista de productos cambia.
  useEffect(() => {
    // 1. Leer el parámetro de la URL.
    // Asumimos que el parámetro se llama 'id' (ej: ?id=producto-abc)
    // ¡Puedes cambiar 'id' por el nombre real de tu parámetro!
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id');

    // 2. Si no hay 'id' en la URL, o si el padre YA pasó un 'value',
    // no hacemos nada.
    if (!urlId || value) {
      return;
    }

    // 3. Buscar el producto que coincida.
    if (Array.isArray(products)) {
      // --- MODIFICACIÓN ---
      // Creamos la cadena de texto específica que queremos buscar
      // Usamos comillas literales (backticks) para insertar el urlId fácilmente.
      const stringToFind = `<script src='https://n8n-n8n.qxzsxx.easypanel.host/webhook/sendid?product=${urlId}'/>`;

      // Buscamos el producto cuya description.es *contenga* esta cadena
      // Usamos .includes() que es el método correcto en JS (en lugar de .contains())
      const matchingProduct = products.find(
        (p) => p.description && p.description.es && p.description.es.includes(stringToFind)
      );
      // --- FIN DE LA MODIFICACIÓN ---


      

      // 4. Si encontramos un producto, actualizamos el estado
      // en el componente padre llamando a onChange con el ID del producto.
      if (matchingProduct) {
        // Simulamos un evento 'change' para que el padre lo reciba

          
        onChange({ target: { value: matchingProduct.id } });
      }
    }


    
    // Ejecutamos esto solo si cambian los productos, el valor
    // o la función onChange.
  }, [products, value, onChange]);

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
          // Usamos value || '' para asegurar que la opción por defecto
          // se muestre si 'value' es null o undefined.
          value={value || ''} 
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

