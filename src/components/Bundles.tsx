import React, { useEffect, useState } from 'react';

interface Discount {
  label: string;
  quantity: number;
  subtitle: string;
  priceOriginal: string;
  priceFinal: string;
  default?: boolean;
  labelText: string;
  name?: string;
}

interface BundlesProps {
  discounts?: Discount[];
  colorBorder?: string;
  colorDiscount?: string;
  labelBackgroundColor?: string;
  bundleTitle?: string;
  variantsOn?: string | boolean;
  onSelectQuantity?: (quantity: number) => void;
}

// Se asumen las props basadas en los atributos data- en el código original
const Bundles = ({
    discounts = [], // Se debe pasar el array de descuentos como una prop, NO se puede parsear desde el DOM aquí.
    colorBorder = '#8c52ff', // Se usa el valor por defecto del código original
    colorDiscount = '#8c52ff', // Renombrado a 'colorDiscount' para consistencia en props
    labelBackgroundColor = '#8c52ff', // Renombrado a 'labelBackgroundColor'
    bundleTitle = '¡GANÁ comprando POR CANTIDAD!',
    variantsOn = 'false', // Se asume un string, como al obtenerlo de un atributo
    // Función de callback opcional para notificar la cantidad seleccionada
    onSelectQuantity,
}: BundlesProps) => {
    // 1. Estado para manejar la selección
    const defaultDiscount = discounts.find(d => d.default);
    const initialQuantity = defaultDiscount ? defaultDiscount.quantity : (discounts[0]?.quantity || null);

    const [selected, setSelected] = useState(initialQuantity);

    // 2. Notificar la cantidad seleccionada al componente padre
    useEffect(() => {
        if (onSelectQuantity && selected !== null) {
            onSelectQuantity(selected);
        }
    }, [selected, onSelectQuantity]);

    // 3. Manejar la lógica de manipulación del DOM (código original)
    // ESTA ES LA PARTE CRÍTICA: Simula el comportamiento del código nativo.
    useEffect(() => {
        if (selected === null) return;

        // Lógica de actualizar el campo de cantidad externo (js-quantity-input)
        const quantityInput = document.getElementsByClassName('js-quantity-input')[0] as HTMLInputElement;
        if (quantityInput) {
            // Asigna la cantidad seleccionada al campo de cantidad externo
            quantityInput.value = String(selected); 
            // Podrías necesitar disparar un evento 'change' si la lógica externa lo requiere
            // quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Lógica para mover las variantes (variantsOn == true)
        if (variantsOn === 'true' || variantsOn === true) {
            const variantgroups = document.getElementsByClassName("js-product-variants-group")[0] as HTMLElement;
            
            if (variantgroups) {
                // Notar que el código original accede a childNodes[1].childNodes[3] y [5]
                // Esto es EXTREMADAMENTE FRÁGIL y depende de la estructura HTML exacta.
                const selectvariant = variantgroups.children[1]?.children[3] as HTMLElement;
                const selectvarianticon = variantgroups.children[1]?.children[5] as HTMLElement;

                if (selectvariant) {
                    selectvariant.style.width = '50%';
                    selectvariant.style.padding = '6px';
                    selectvariant.style.borderRadius = '6px';
                }

                if (selectvarianticon) {
                    selectvarianticon.style.position = 'absolute';
                    selectvarianticon.style.top = '4.4rem';
                    selectvarianticon.style.left = '9rem';
                }
                
                // Ocultar el grupo de variantes
                variantgroups.style.display = 'none';

                // Encontrar el elemento de lista de descuento activo
                const activeDiscountElement = document.getElementById(`emapps-bundle-${selected}`);

                // Mover los elementos de variante a la lista activa
                if (activeDiscountElement) {
                    if (selectvariant && !activeDiscountElement.contains(selectvariant)) {
                        activeDiscountElement.appendChild(selectvariant);
                    }
                    if (selectvarianticon && !activeDiscountElement.contains(selectvarianticon)) {
                        activeDiscountElement.appendChild(selectvarianticon);
                    }
                }
            }
        }
    }, [selected, variantsOn, discounts]); // Dependencias para re-ejecutar la lógica al cambiar la selección

    // Función para manejar el clic y actualizar el estado
    const handleSelect = (quantity) => {
        setSelected(quantity);
    };


    // 4. Renderizado JSX con estilos y lógica integrada
    return (
        <div className="emapps-discount-radio-group">
            {/* Estilos CSS dinámicos, adaptados del código original */}
            <style>{`
                .emapps-discount-radio-group {
                    font-family: sans-serif;
                    max-width: 360px;
                    margin: 20px auto;
                }
                .emapps-discount-radio-group-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .emapps-discount-radio-group-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .emapps-discount-radio-group-list-item {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 12px;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s ease;
                }
                .emapps-discount-radio-group-list-item input[type="radio"] {
                    margin-right: 10px;
                }
                .emapps-discount-radio-group-list-item-active {
                    border: 2px solid ${colorBorder};
                    box-shadow: 0 0 0 3px #00000042;
                }
                .emapps-discount-radio-group-list-item-qty-info-unit {
                    font-weight: bold;
                }
                .emapps-discount-radio-group-list-item-qty-info-percent {
                    font-size: 0.9em;
                    color: #666;
                }
                /* Nota: Se adaptó 'colortDiscount' del código nativo a 'colorDiscount' en la prop */
                .emapps-discount-radio-group-list-item-qty-price-de {
                    text-decoration: line-through;
                    font-size: 0.85em;
                    color: ${colorDiscount};
                }
                .emapps-discount-radio-group-list-item-qty-price-por {
                    font-weight: bold;
                    font-size: 1.1em;
                }
                /* Nota: Se adaptó 'backgroundLabelColor' del código nativo a 'labelBackgroundColor' en la prop */
                .emapps-discount-radio-group-list-item-default-discount {
                    position: absolute;
                    top: -10px;
                    right: 10px;
                    background: ${labelBackgroundColor};
                    color: white;
                    font-weight: bold;
                    font-size: 0.75rem;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                /* Estilos inline adicionales para los subelementos de cantidad y subtítulo */
                .emapps-discount-radio-group-list-item-qty-info {
                    display: flex;
                    align-items: center;
                }
                .emapps-discount-radio-group-list-item-label-text {
                    background-color: ${labelBackgroundColor};
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-size: 10px;
                }
                .emapps-discount-radio-group-list-item-info-container {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .emapps-discount-radio-group-list-item-offer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
            `}</style>

            <h4 className="emapps-discount-radio-group-title">{bundleTitle}</h4>

            <div className="emapps-discount-radio-group-list">
                {discounts.map((discount, index) => {
                    const isActive = selected === discount.quantity;

                    return (
                        <div
                            key={index}
                            id={`emapps-bundle-${discount.quantity}`} // ID usado para mover variantes
                            className={`emapps-discount-radio-group-list-item ${
                                isActive ? 'emapps-discount-radio-group-list-item-active' : ''
                            }`}
                            onClick={() => handleSelect(discount.quantity)}
                        >
                            <div className="emapps-discount-radio-group-list-item-offer-container">
                                <div className="emapps-discount-radio-group-list-item-qty-info">
                                    <input
                                        type="radio"
                                        name="emapps-discount"
                                        value={discount.quantity}
                                        checked={isActive}
                                        readOnly
                                    />
                                    <div className="emapps-discount-radio-group-list-item-info-container">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="emapps-discount-radio-group-list-item-qty-info-unit">
                                                {discount.name || `${discount.quantity} Unidad${discount.quantity > 1 ? 'es' : ''}`}
                                            </div>
                                            {discount.labelText && (
                                                <p className="emapps-discount-radio-group-list-item-label-text">
                                                    {discount.labelText}
                                                </p>
                                            )}
                                        </div>
                                        {discount.subtitle && (
                                            <div className="emapps-discount-radio-group-list-item-qty-info-subtitle">
                                                {discount.subtitle}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="emapps-discount-radio-group-list-item-price-box">
                                    <div className="emapps-discount-radio-group-list-item-qty-price-de">
                                        ${discount.priceOriginal}
                                    </div>
                                    <div className="emapps-discount-radio-group-list-item-qty-price-por">
                                        ${discount.priceFinal}
                                    </div>
                                </div>
                            </div>

                            {discount.default && (
                                <div className="emapps-discount-radio-group-list-item-default-discount">
                                    ¡Más comprado!
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bundles;
