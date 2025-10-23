import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import VideoSection from "./VideoSection";
import ComplementsList from "./ComplementsList";
import ProductSelect from "./ProductSelect";

interface Discount {
  label: string;
  quantity: number;
  subtitle: string;
  priceoriginal: string;
  pricefinal: string;
  default?: boolean;
  labeltext: string;
  name?: string;
}


interface Complement {
  nameComplement: string;
  urlProduct: string;
  idTnProduct: string;
  urlImageProduct: string;
  precioAntesComplemento: string;
  precioDespuesComplemento: string;

}

interface BundlesProps {
  discounts?: Discount[];
  colorBorder?: string;
  colorDiscount?: string;
  labelBackgroundColor?: string;
  bundleTitle?: string;
  variantsOn?: string | boolean;
  onSelectQuantity?: (quantity: number) => void;
  complements?: Complement[];
  complementTitle?: string;
  complementsOn?: string | boolean;
  products?: any[]
}

const Bundles1 = ({
  discounts = [],
  colorBorder = "#8c52ff",
  colorDiscount = "#8c52ff",
  labelBackgroundColor = "#8c52ff",
  bundleTitle = "¡GANÁ comprando POR CANTIDAD!",
  variantsOn = "false",
  onSelectQuantity,
  complements = [],
  complementTitle = "Completa tu kit",
  complementsOn ="false",
  products = []

}: BundlesProps) => {
  // Estado arranca en null
  const [selected, setSelected] = useState<number | null>(null);
  // Nuevo estado para el contenido del textarea del script
  const [scriptContent, setScriptContent] = useState("");

  // Lógica de `obtenerCookie` (la mantendremos aquí por si se necesita)
  function obtenerCookie(nombre: string) {
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

  // Effect para obtener el 'id' del query param y generar el script
  useEffect(() => {

    


    // Es importante que este código se ejecute en el navegador
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search);
      const product_id = param.get("id");

      const scriptBase =
        '<script src="https://n8n-n8n.qxzsxx.easypanel.host/webhook/merchant?product=';
      const scriptEnd = '">';

      if (product_id) {
        // Genera el script con el product_id
        setScriptContent(scriptBase + product_id + scriptEnd);
      } else {
        // Opción si no se encuentra el ID
        setScriptContent(scriptBase + "ID_NO_ENCONTRADO" + scriptEnd);
      }
    }
  }, []); // El array vacío asegura que solo se ejecute al montar

  // Cuando cambian los descuentos, seleccionar el default o el primero
  useEffect(() => {
    if (discounts.length > 0) {
      const defaultIndex = discounts.findIndex((d) => d.default === true);
      setSelected(defaultIndex !== -1 ? defaultIndex : 0);
    }
  }, [discounts]);

  // Avisar al padre la cantidad seleccionada
  useEffect(() => {
    if (onSelectQuantity && selected !== null) {
      onSelectQuantity(discounts[selected]?.quantity ?? 0);
    }
  }, [selected, onSelectQuantity, discounts]);

  // Actualizar inputs externos y variantes
  useEffect(() => {
    if (selected === null) return;

    const quantityInput = document.getElementsByClassName(
      "js-quantity-input"
    )[0] as HTMLInputElement;

    if (quantityInput) {
      quantityInput.value = String(discounts[selected]?.quantity ?? 1);
    }

    if (variantsOn === "true" || variantsOn === true) {
      const variantgroups = document.getElementsByClassName(
        "js-product-variants-group"
      )[0] as HTMLElement;

      if (variantgroups) {
        const selectvariant = variantgroups.children[1]
          ?.children[3] as HTMLElement;
        const selectvarianticon = variantgroups.children[1]
          ?.children[5] as HTMLElement;

        if (selectvariant) {
          selectvariant.style.width = "50%";
          selectvariant.style.padding = "6px";
          selectvariant.style.borderRadius = "6px";
        }

        if (selectvarianticon) {
          selectvarianticon.style.position = "absolute";
          selectvarianticon.style.top = "4.4rem";
          selectvarianticon.style.left = "9rem";
        }

        variantgroups.style.display = "none";

        const activeDiscountElement = document.getElementById(
          `emapps-bundle-${selected}`
        );

        if (activeDiscountElement) {
          if (selectvariant && !activeDiscountElement.contains(selectvariant)) {
            activeDiscountElement.appendChild(selectvariant);
          }
          if (
            selectvarianticon &&
            !activeDiscountElement.contains(selectvarianticon)
          ) {
            activeDiscountElement.appendChild(selectvarianticon);
          }
        }
      }
    }
  }, [selected, variantsOn, discounts]);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleApply = () => {
    setLoading(true);
    let access_token = obtenerCookie("access_token");
    let tiendanube_token = obtenerCookie("tiendanube_token");
let tiendanube_user_id = obtenerCookie("tiendanube_user_id");
    let param = new URLSearchParams(window.location.search);
    let product_id = param.get("id");







    


    if (access_token) {


      fetch(
        "https://n8n-n8n.qxzsxx.easypanel.host/webhook/scriptproduct?access_token=" +tiendanube_token+"&user_id="+tiendanube_user_id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product_id,
            product_tn_id: productoSeleccionado,
          }),
        }
      )



      let urlLoginProd =
        "https://n8n-n8n.qxzsxx.easypanel.host/webhook/ofertas?access_token=" +
        access_token +
        "&product_id=" +
        product_id;




           let urlLoginTest =
        "https://n8n-n8n.qxzsxx.easypanel.host/webhook/complementos?access_token=" +
        access_token +
        "&product_id=" +
        product_id;

      fetch(urlLoginProd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ofertas: discounts,
          colors: {
            border: colorBorder,
            discount: colorDiscount,
            label: labelBackgroundColor,
          },
          bundle_title: bundleTitle,
          variants_on: variantsOn,
          style: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);



    




        })
       


     fetch(urlLoginTest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complementos: complements,
         
          complementTitle: complementTitle,
          complementsOn: complementsOn
         
        }),
      })
        .then((response) => response.json())
        .then((data) => {









          




        })
        .finally(() => {
          setLoading(false);
        });









    }
  };

  const [loading, setLoading] = useState(false);

  const [selectedComplement, setSelectedComplement] = useState([]);

  const handleSelectComplement = (index) => {
    setSelectedComplement((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };



const [productoSeleccionado, setProductoSeleccionado] = useState({});

  // 2. Handler que se ejecutará cuando el <select> cambie
  const handleSelectChange = (event) => {
    // event.target.value contendrá el ID del producto (ej: "301548428")



    setProductoSeleccionado(event.target.value);
  };


  return (
    <>
      <div className="emapps-discount-radio-group">
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
          .emapps-discount-radio-group-list-item-qty-price-de {
            text-decoration: line-through;
            font-size: 0.85em;
            color: ${colorDiscount};
          }
          .emapps-discount-radio-group-list-item-qty-price-por {
            font-weight: bold;
            font-size: 1.1em;
          }
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
            const isActive = selected === index;
            return (
              <div
                key={index}
                id={`emapps-bundle-${index}`}
                className={`emapps-discount-radio-group-list-item ${
                  isActive ? "emapps-discount-radio-group-list-item-active" : ""
                }`}
                onClick={() => handleSelect(index)}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="emapps-discount-radio-group-list-item-qty-info-unit">
                          {discount.name ||
                            `${discount.quantity} Unidad${
                              discount.quantity > 1 ? "es" : ""
                            }`}
                        </div>
                        {discount.labeltext && (
                          <p className="emapps-discount-radio-group-list-item-label-text">
                            {discount.labeltext}
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
                      ${discount.priceoriginal}
                    </div>
                    <div className="emapps-discount-radio-group-list-item-qty-price-por">
                      ${discount.pricefinal}
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




          {complementsOn == true &&


          <ComplementsList complements={complements} selected={selectedComplement} onSelect={handleSelectComplement} complementTitle={complementTitle} />
          }



      </div>
      <div className="flex justify-center">
        <Button
        disabled={loading}
          onClick={(e) => {
            handleApply();

          }}
          variant={"default"}
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
      <div className="flex justify-center">


        <ProductSelect products={products} value={productoSeleccionado} onChange={(event)=>handleSelectChange(event)} />
        {/* <h5 style={{ fontWeight: "bold", marginTop: "20px" }}>
          Script del Producto:
        </h5>
        <textarea
          name="product-script"
          id="product-script"
          rows={3}
          readOnly
          value={scriptContent} // **Usamos el estado aquí**
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        ></textarea>
        <p style={{ marginTop: "10px" }} className="text-gray-500">
          * Esto tiene que ser pegado en la descripcion del producto
        </p> */}
      </div>
      <VideoSection />
    </>
  );
};

export default Bundles1;
