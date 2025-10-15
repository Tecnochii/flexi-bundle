import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Discount {
  label: string;
  quantity: number;
  subtitle: string;
  priceoriginal: string;
  pricefinal: string;
  default?: boolean;
  labeltext: string;
  name?: string;
  badge?: string; // Propiedad para "Más popular", "Mejor valor", etc.
  img?: string;
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

const Bundles2 = ({
  discounts = [],
  colorBorder = '#e00056',
  colorDiscount = '#e00056',
  labelBackgroundColor = '#e00056',
  bundleTitle = 'Suscríbete y ahorra un 25%',
  variantsOn = 'false',
  onSelectQuantity,
}: BundlesProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [scriptContent, setScriptContent] = useState('');

  function obtenerCookie(nombre: string) {
    const nombreBuscado = nombre + '=';
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search);
      const product_id = param.get('id');
      const scriptBase = '<script src="https://n8n-n8n.qxzsxx.easypanel.host/webhook/merchant?product=';
      const scriptEnd = '">';
      setScriptContent(scriptBase + (product_id ?? 'ID_NO_ENCONTRADO') + scriptEnd);
    }
  }, []);

  useEffect(() => {
    if (discounts.length > 0) {
      const defaultIndex = discounts.findIndex((d) => d.default === true);
      setSelected(defaultIndex !== -1 ? defaultIndex : 0);
    }
  }, [discounts]);

  useEffect(() => {
    if (onSelectQuantity && selected !== null) {
      onSelectQuantity(discounts[selected]?.quantity ?? 0);
    }
  }, [selected, onSelectQuantity, discounts]);

  const handleSelect = (index: number) => setSelected(index);

  const handleApply = () => {


setLoading(true);

    let access_token = obtenerCookie('access_token');
    let param = new URLSearchParams(window.location.search);
    let product_id = param.get('id');

    if (access_token) {
      let urlLoginTest =
        'https://n8n-n8n.qxzsxx.easypanel.host/webhook/ofertas?access_token=' +
        access_token +
        '&product_id=' +
        product_id;

      fetch(urlLoginTest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ofertas: discounts,
          colors: {
            border: colorBorder,
            discount: colorDiscount,
            label: labelBackgroundColor,
          },
          bundle_title: bundleTitle,
          variants_on: variantsOn,
          style:2
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .finally(() => setLoading(false));
        
    }
  };


  const [loading, setLoading] = useState(false);




  return (
    <>
      <div className="emapps-discount-radio-group">
        <style>{`
          /* Estilos para ocultar la barra de scroll en la lista de descuentos */
          .emapps-discount-radio-group-list {
            /* Ocultar barra de scroll para Firefox */
            scrollbar-width: none; 
            /* Ocultar barra de scroll para IE y Edge */
            -ms-overflow-style: none; 
          }
          /* Ocultar barra de scroll para Chrome, Safari y Opera */
          .emapps-discount-radio-group-list::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
          }

          /* Estilos generales del componente */
          .emapps-discount-radio-group {
            font-family: 'Inter', sans-serif;
            max-width: 500px; 
            margin: 30px auto; 
          }
          .emapps-discount-radio-group-title {
            font-size: 1.3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 30px; 
            color: #000;
          }
          .emapps-discount-radio-group-list {
            display: flex;
            justify-content: flex-start; 
            gap: 16px;
            flex-wrap: nowrap; 
            overflow-x: auto; 
            padding: 20px 0 30px 0; 
          }
          .emapps-discount-radio-group-list-item {
            flex-shrink: 0; 
            min-width: 200px;
            max-width: 260px;
            min-height: 250px; 
            padding: 24px 16px; 
            
            border-radius: 12px;
            text-align: center;
            background: #fff;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.25s ease;
            position: relative;
          }
          .emapps-discount-radio-group-list-item:hover {
            transform: translateY(-4px);
          }
          .emapps-discount-radio-group-list-item-active {
            border: 3px solid ${colorBorder};
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
          }
          .emapps-badge-top {
            position: absolute;
            top: -14px;
            left: -3px;
            width: 12.5rem;
            background: ${labelBackgroundColor};
            color: #fff;
            font-weight: bold;
            font-size: 0.85rem;
            padding: 4px 0;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
          .emapps-discount-radio-group-list-item img {
            width: 80px;
            height: auto;
            margin: 10px auto;
          }
          .emapps-discount-radio-group-list-item-qty-info-unit {
            font-weight: 600;
            font-size: 1rem;
          }
          .emapps-discount-radio-group-list-item-qty-info-subtitle {
            color: ${colorDiscount};
            font-size: 0.9rem;
            font-weight: 600;
            margin-top: 4px;
          }
          .emapps-discount-radio-group-list-item-price-box {
            margin-top: 10px;
          }
          .emapps-discount-radio-group-list-item-qty-price-de {
            text-decoration: line-through;
            font-size: 0.9em;
            color: #888;
          }
          .emapps-discount-radio-group-list-item-qty-price-por {
            font-size: 1.3em;
            font-weight: bold;
            color: #000;
          }
        `}</style>

        <h4 className="emapps-discount-radio-group-title">{bundleTitle}</h4>

        <div className="emapps-discount-radio-group-list">
          {discounts.map((discount, index) => {
            const isActive = selected === index;
            
            // Lógica para determinar el texto del badge
            let badgeText = discount.badge;
            if (!badgeText && discount.default) {
              badgeText = discount.label;
            }

            return (
              <div
                key={index}
                id={`emapps-bundle-${index}`}
                className={`emapps-discount-radio-group-list-item ${
                  isActive ? 'emapps-discount-radio-group-list-item-active' : ''
                }`}
                onClick={() => handleSelect(index)}
              >
                {/* Renderizar el badge con la nueva lógica */}
                {badgeText && <div className="emapps-badge-top">{badgeText}</div>}

                <img src={discount.img} alt="Producto" />

                <div className="emapps-discount-radio-group-list-item-qty-info-unit">
                  {discount.name}
                </div>

                {discount.subtitle && (
                  <div className="emapps-discount-radio-group-list-item-qty-info-subtitle">
                    {discount.subtitle}
                  </div>
                )}

                <div className="emapps-discount-radio-group-list-item-price-box">
                  <div className="emapps-discount-radio-group-list-item-qty-price-por">
                    ${discount.pricefinal}
                  </div>
                  <div className="emapps-discount-radio-group-list-item-qty-price-de">
                    ${discount.priceoriginal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
                disabled={loading}

          onClick={(e)=>{
            handleApply()
             
          }}
          variant={'default'}
          className="w-80 mt-4 shadow-md"
        >
             {loading && (
        <span
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid white",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      )}
      {loading ? "Aplicando..." : "Aplicar Cambios"}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
        </Button>
      </div>

      <div>
        <h5 style={{ fontWeight: 'bold', marginTop: '20px' }}>Script del Producto:</h5>
        <textarea
          name="product-script"
          id="product-script"
          rows={3}
          readOnly
          value={scriptContent}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <p style={{ marginTop: '10px' }} className="text-gray-500">
          * Esto tiene que ser pegado en la descripción del producto
        </p>
      </div>
    </>
  );
};

export default Bundles2