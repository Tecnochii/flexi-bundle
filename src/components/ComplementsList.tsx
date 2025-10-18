import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ComplementsList({ complements, selected, onSelect, complementTitle }) {



  return (
    // Contenedor principal
    <div className="flex flex-col gap-4 mt-10">
        <h4 className="emapps-discount-radio-group-title flex  justify-center">{complementTitle}</h4>

      {complements.map((complement, index) => {
        const isSelected = selected.includes(index);





        return (
            <>
            
            
            


          <Card
            key={index}
            className={`
              flex items-center justify-between p-4 cursor-pointer 
              transition-all duration-200 ease-in-out border-2 
              ${isSelected 
                ? "border-primary bg-primary/10 shadow-lg" 
                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
              }
            `}
            onClick={() => onSelect(index)} 
          >
            <CardTitle>



            </CardTitle>
            <CardContent className="flex items-center justify-between w-full p-0">
              
              {/* AGRUPACIÓN DE IMAGEN, NOMBRE Y PRECIOS */}
              <div className="flex flex-1 items-center gap-4 sm:gap-6 min-w-0">
                
                {/* 1. IMAGEN */}
                <a
                  href={complement.urlProduct}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} 
                  className="shrink-0"
                >
                  <img
                    src={complement.urlImageProduct}
                    alt={complement.nameComplement}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-100 shadow-sm"
                  />
                </a>
                
                {/* 2. NOMBRE Y PRECIOS */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  {/* Nombre del Complemento */}
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {complement.nameComplement}
                  </h2>

                  {/* Precios */}
                  {complement.precioAntesComplemento != null && (
                    <div className="flex items-baseline gap-2 mt-1">
                        
                      {/* Precio Antes (tachado, solo si hay un descuento real) */}
                      {complement.precioAntesComplemento && (
                        <span className="text-sm text-gray-500 line-through">
                          ${complement.precioAntesComplemento}
                        </span>
                      )}

                      {/* Precio Principal (el precio actual) */}
                      <span className={`
                          ${complement.precioDespuesComplemento ? 'text-xl font-bold text-primary' : 'text-lg font-bold text-gray-700'}
                      `}>
                        ${ complement.precioDespuesComplemento}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 3. CHECKBOX Y ETIQUETA */}
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <Checkbox
                  id={`complement-${index}`}
                  checked={isSelected}
                  onCheckedChange={() => onSelect(index)} 
                  className="w-5 h-5"
                />
                <label
                  htmlFor={`complement-${index}`}
                  className="text-base font-medium text-gray-600 hidden sm:block select-none" 
                  onClick={(e) => e.stopPropagation()} 
                >
                </label>
              </div>

            </CardContent>
          </Card>
            </>

        );
      })}
    </div>

  );
}