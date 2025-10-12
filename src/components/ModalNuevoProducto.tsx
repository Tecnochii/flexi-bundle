// ModalNuevoProducto.tsx
import React from 'react';
import { Package, X } from 'lucide-react';
// Asegúrate de importar el componente Button de donde corresponda
import { Button } from './ui/button'; 

// --- Interfaces se mantienen iguales ---
interface NuevoProductoForm {
  nombre: string;
  product_tn_id: string;
  color_border: string;
  color_discount: string;
  background_label_color: string;
  bundle_title: string;
  variants_on: boolean;
}

interface ModalProps {
    isModalOpen: boolean;
    nuevoProductoData: NuevoProductoForm;
    onClose: () => void;
    // La función que maneja el cambio en el input, proveniente del padre
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    // La función que maneja el envío, proveniente del padre
    onSubmit: (data: NuevoProductoForm) => void; 
}
// ----------------------------------------

const ModalNuevoProducto: React.FC<ModalProps> = ({
    isModalOpen,
    nuevoProductoData,
    onClose,
    onFormChange,
    onSubmit,
}) => {
    if (!isModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(nuevoProductoData);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Package className="w-5 h-5" /> Añadir Nuevo Producto
                    </h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Bundle</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={nuevoProductoData.nombre}
                            // Usamos la prop onFormChange del padre
                            onChange={onFormChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

              

                   

                    <div>
                        <label htmlFor="bundle_title" className="block text-sm font-medium text-gray-700">Título Bundle</label>
                        <input
                            id="bundle_title"
                            name="bundle_title"
                            type="text"
                            value={nuevoProductoData.bundle_title}
                            onChange={onFormChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="variants_on"
                            name="variants_on"
                            type="checkbox"
                            checked={nuevoProductoData.variants_on}
                            onChange={onFormChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="variants_on" className="text-sm font-medium text-gray-700">Variantes Activadas</label>
                    </div>

                    <div className="pt-4 border-t">
                        <Button type="submit" className="w-full">Guardar Producto</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalNuevoProducto;