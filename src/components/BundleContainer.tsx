import { useEffect, useState } from "react";
import Bundles from "./Bundles1";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Plus, Edit, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import BotonVolver from "./BotonVolver";
import BotonLogout from "./BotonLogout";
import { useNavigate } from "react-router-dom";
import Bundles1 from "./Bundles1";
import Bundles2 from "./Bundles2";

interface Discount {
  label: string;
  quantity: number;
  subtitle: string;
  priceoriginal: string;
  pricefinal: string;
  default?: boolean;
  labeltext: string;
  name?: string;
  img?: string;
  style:number;
}



interface Complement {
  nameComplement: string;
  urlProduct: string;
  idTnProduct: string;
  urlImageProduct: string;
}

// Valores iniciales por defecto para el formulario
const initialFormState: Discount = {
  label: "",
  quantity: 1,
  subtitle: "3 cuotas sin interés",
  priceoriginal: "",
  pricefinal: "",
  default: false,
  labeltext: "Envio gratis",
  name: "",
};


const initialFormStateComplement: Complement = {
  nameComplement: "",
  urlProduct: "",
  idTnProduct: "",
  urlImageProduct: "",
};

// Datos iniciales de Bundles
const initialDiscounts: Discount[] = [
  {
    label: "MAS COMPRADO",
    quantity: 1,
    subtitle: "3 cuotas sin interés",
    priceoriginal: "71.999,00",
    pricefinal: "44.999,00",
    labeltext: "Envio gratis",
    name: "1 Unidad",
    default: true,
    style:1
  },
];



const initialComplements: Complement[] = [
  {
    nameComplement: "Complementos",
    urlProduct: "test",
    idTnProduct: "test",
    urlImageProduct: "test",
  },
];


// 1. Detección del índice predeterminado para el estado inicial
const defaultIndex = initialDiscounts.findIndex((d) => d.default);





const BundleContainer = () => {
  let navigate = useNavigate();

  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [complements, setComplements] = useState<Complement[]>(initialComplements);


  // 2. Inicializar selectedIndex con el índice predeterminado detectado (o null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    defaultIndex !== -1 ? defaultIndex : null
  );


  const [selectedIndexComplement, setSelectedIndexComplement] = useState<number | null>(
    defaultIndex !== -1 ? defaultIndex : null
  );



  const [form, setForm] = useState<Discount>(initialFormState);
  const [formComplement, setFormComplement] = useState<Complement>(initialFormStateComplement);

  const [borderColor, setBorderColor] = useState("");
  const [discountColor, setDiscountColor] = useState("");
  const [labelBackgroundColor, setLabelBackgroundColor] = useState("");
  const [bundleTitle, setBundleTitle] = useState(
    "¡GANÁ comprando POR CANTIDAD!"
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
const [editingIndexComplement , setEditingIndexComplement] = useState<number | null>(null);

  
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [variantsOn, setVariantsOn] = useState("false");
  const [complementsOn, setComplementsOn]= useState("false");
  const [imagen, setImg] = useState("");
const [style, setStyle] = useState(1);
    // En tu componente principal (donde uses este JSX) deberías definir el estado, por ejemplo:
const [selectedStyle, setSelectedStyle] = useState('clasico');
  // Función de utilidad para obtener cookie (mantener)
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

  // useEffect para la carga inicial (MODIFICADO para establecer el índice)
  useEffect(() => {
    let access_token = obtenerCookie("access_token");

    let param = new URLSearchParams(window.location.search);
    let product_id = param.get("id");

    if (access_token) {
      let urlLoginTest =
        "https://n8n-n8n.qxzsxx.easypanel.host/webhook/ofertas?access_token=" +
        access_token +
        "&product_id=" +
        product_id;
      fetch(urlLoginTest, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0] && data[0].product && data[0].ofertas) {
            setBorderColor(data[0].product.color_border);
            setLabelBackgroundColor(data[0].product.background_label_color);
            setDiscountColor(data[0].product.color_discount);
            setBundleTitle(data[0].product.bundle_title);
            setVariantsOn(data[0].product.variants_on);
            setImg(data[0].product.img);
            setStyle(data[0].product.style);


            if (data[0].product.style === 1) {
              setSelectedStyle("clasico");
            } else {
              setSelectedStyle("moderno");
            }



            setForm({
              ...form,
              ["variants"]: data[0].product.variants_on,
            });

            const fetchedDiscounts: Discount[] = data[0].ofertas;
            setDiscounts(fetchedDiscounts);


            console.log(data[0].product.style);

            // 3. Lógica para seleccionar el default al cargar desde la API
            const defaultIndex = fetchedDiscounts.findIndex((d) => d.default);
            if (defaultIndex !== -1) {
              setSelectedIndex(defaultIndex);
            } else if (fetchedDiscounts.length > 0) {
              // Si no hay default explícito, seleccionar el primer elemento
              setSelectedIndex(0);
            } else {
              setSelectedIndex(null);
            }
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (
    field: keyof Discount,
    value: string | number | boolean
  ) => {
    setForm({
      ...form,
      [field]: value,
    });
  };




  const handleChangeComplements = (
    field: keyof Complement,
    value: string | number | boolean
  ) => {
    setFormComplement({
      ...formComplement,
      [field]: value,
    });
  };



  /**
   * Maneja el envío del formulario (Agregar o Editar).
   * Implementa la lógica de 'solo un predeterminado'.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount: Discount = {
      ...form,
      quantity: Number(form.quantity),
      name: form.name || `${form.quantity} Unidades`,
    };

    let updatedDiscounts: Discount[];
    let targetIndex: number; // Para rastrear el índice del elemento modificado/añadido

    if (newDiscount.default) {
      // 1. Si el nuevo/editado se marca como DEFAULT, desmarcar todos los demás.
      const cleanedDiscounts = discounts.map((d) => ({
        ...d,
        default: false, // Desmarcar todos
      }));

      if (editingIndex !== null) {
        // MODO EDICIÓN
        updatedDiscounts = cleanedDiscounts.map((d, i) =>
          i === editingIndex ? newDiscount : d
        );
        targetIndex = editingIndex; // El índice modificado es el índice de edición
        setEditingIndex(null);
      } else {
        // MODO AGREGAR
        updatedDiscounts = [...cleanedDiscounts, newDiscount];
        targetIndex = updatedDiscounts.length - 1; // El índice añadido es el último
      }
    } else {
      // 2. Si el nuevo/editado NO es default, solo actualizar/añadir el elemento.
      if (editingIndex !== null) {
        // MODO EDICIÓN
        updatedDiscounts = discounts.map((d, i) =>
          i === editingIndex ? newDiscount : d
        );
        targetIndex = editingIndex;
        setEditingIndex(null);
      } else {
        // MODO AGREGAR
        updatedDiscounts = [...discounts, newDiscount];
        targetIndex = updatedDiscounts.length - 1;
      }
    }

    setDiscounts(updatedDiscounts); // Guardar la lista final
    setForm(initialFormState); // Resetear formulario
    // 4. Seleccionar el elemento que acaba de ser creado/editado
    setForm({
      ...form,
      ["variants"]: variantsOn,
    });
    setSelectedIndex(targetIndex);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const newDiscounts = discounts.filter((_, i) => i !== selectedIndex);
      setDiscounts(newDiscounts);
      // Seleccionar el índice anterior, o null si la lista queda vacía
      const newIndex =
        selectedIndex > 0
          ? selectedIndex - 1
          : newDiscounts.length > 0
          ? 0
          : null;
      setSelectedIndex(newIndex);

      if (editingIndex === selectedIndex) {
        setEditingIndex(null);
        setForm(initialFormState);
      }

      setForm({
        ...form,
        ["variants"]: variantsOn,
      });
    }
  };

  const startEditing = () => {
    if (selectedIndex !== null && discounts[selectedIndex]) {
      setEditingIndex(selectedIndex);
      setForm(discounts[selectedIndex]);
    }

    setForm({
      ...form,
      ["name"]: discounts[selectedIndex]?.name || "",
      ["quantity"]: discounts[selectedIndex]?.quantity || 0,
      ["label"]: discounts[selectedIndex]?.label || "",
      ["subtitle"]: discounts[selectedIndex]?.subtitle || "",
      ["priceoriginal"]: discounts[selectedIndex]?.priceoriginal || "",
      ["pricefinal"]: discounts[selectedIndex]?.pricefinal || "",
      ["labeltext"]: discounts[selectedIndex]?.labeltext || "",
      ["img"]: discounts[selectedIndex]?.img || "",
      ["variants"]: variantsOn,
      
    });
  };







  const handleSubmitComplements = (e: React.FormEvent) => {
    e.preventDefault();
    const newComplement: Complement = {
      ...formComplement,
      nameComplement: formComplement.nameComplement,
      idTnProduct: formComplement.idTnProduct,
    };

    let updatedComplements: Complement[];
    let targetIndex: number; // Para rastrear el índice del elemento modificado/añadido

  {
      // 2. Si el nuevo/editado NO es default, solo actualizar/añadir el elemento.
      if (editingIndexComplement !== null) {
        // MODO EDICIÓN
        updatedComplements = complements.map((d, i) =>
          i === editingIndexComplement ? newComplement : d
        );
        targetIndex = editingIndexComplement;
        setEditingIndexComplement(null);
      } else {
        // MODO AGREGAR
        updatedComplements = [...complements, newComplement];
        targetIndex = updatedComplements.length - 1;
      }
    }

    setComplements(updatedComplements); // Guardar la lista final
    setForm(initialFormState); // Resetear formulario
    // 4. Seleccionar el elemento que acaba de ser creado/editado
    setFormComplement({
      ...formComplement,
    });
    setSelectedIndex(targetIndex);
  };

  const handleDeleteComplements = () => {
    if (selectedIndex !== null) {
      const newComplements = complements.filter((_, i) => i !== selectedIndex);
      setComplements(newComplements);
      // Seleccionar el índice anterior, o null si la lista queda vacía
      const newIndex =
        selectedIndex > 0
          ? selectedIndex - 1
          : newComplements.length > 0
          ? 0
          : null;
      setSelectedIndex(newIndex);

      if (editingIndexComplement === selectedIndex) {
        setEditingIndexComplement(null);
        setFormComplement(initialFormStateComplement);
      }

      setFormComplement({
        ...formComplement,
      });
    }
  };

  const startEditingComplements = () => {
    if (selectedIndex !== null && complements[selectedIndex]) {
      setEditingIndex(selectedIndex);
      setForm(discounts[selectedIndex]);
    }

    setForm({
      ...form,
      ["name"]: discounts[selectedIndex]?.name || "",
      ["quantity"]: discounts[selectedIndex]?.quantity || 0,
      ["label"]: discounts[selectedIndex]?.label || "",
      ["subtitle"]: discounts[selectedIndex]?.subtitle || "",
      ["priceoriginal"]: discounts[selectedIndex]?.priceoriginal || "",
      ["pricefinal"]: discounts[selectedIndex]?.pricefinal || "",
      ["labeltext"]: discounts[selectedIndex]?.labeltext || "",
      ["img"]: discounts[selectedIndex]?.img || "",
      ["variants"]: variantsOn,
      
    });
  };







  
  /**
   * Mueve un descuento hacia arriba o abajo en la lista.
   */
  const handleReorder = (direction: "up" | "down") => {
    if (selectedIndex === null) return;

    const newIndex = selectedIndex + (direction === "up" ? -1 : 1);

    // Validación de límites
    if (newIndex < 0 || newIndex >= discounts.length) return;

    // Clonar la lista y realizar el intercambio
    const newDiscounts = [...discounts];
    [newDiscounts[selectedIndex], newDiscounts[newIndex]] = [
      newDiscounts[newIndex],
      newDiscounts[selectedIndex],
    ];

    setDiscounts(newDiscounts);
    // Actualizar el índice seleccionado al nuevo índice
    setSelectedIndex(newIndex);
  };

  const isEditing = editingIndex !== null;
  const isEditingComplement = editingIndexComplement !== null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="flex justify-between">
        <BotonVolver />
        <BotonLogout />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Configurador de Bundles
          </h1>
          <p className="text-muted-foreground">
            Crea, edita, reordena y gestiona ofertas por cantidad con vista
            previa en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* AGREGAR / EDITAR Oferta Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isEditing ? (
                    <Edit className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  {isEditing
                    ? `Editar Oferta #${editingIndex! + 1}`
                    : "Agregar nueva oferta"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Campos del formulario */}
                  <div className="space-y-2">
                    <Label htmlFor="label">
                      Etiqueta de oferta por defecto (Mas comprado!, Mas
                      vendido!, etc)
                    </Label>
                    <Input
                      required
                      id="label"
                      value={form.label}
                      onChange={(e) => handleChange("label", e.target.value)}
                      placeholder="MAS COMPRADO"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Titulo de oferta</Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="1 Unidad"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      Cantidad (Lo que se va a añadir al carrito)
                    </Label>
                    <Input
                      required
                      id="quantity"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) =>
                        handleChange("quantity", Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      value={form.subtitle}
                      onChange={(e) => handleChange("subtitle", e.target.value)}
                      placeholder="3 cuotas sin interés"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priceoriginal">Precio Antes</Label>
                    <Input
                      required
                      id="priceoriginal"
                      value={form.priceoriginal}
                      onChange={(e) =>
                        handleChange("priceoriginal", e.target.value)
                      }
                      placeholder="71.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricefinal">Precio Ahora</Label>
                    <Input
                      required
                      id="pricefinal"
                      value={form.pricefinal}
                      onChange={(e) =>
                        handleChange("pricefinal", e.target.value)
                      }
                      placeholder="44.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labeltext">
                      Texto de Etiqueta Flotante (Envio gratis, Ahorra
                      $10.000,00, etc)
                    </Label>
                    <Input
                      id="labeltext"
                      value={form.labeltext}
                      onChange={(e) =>
                        handleChange("labeltext", e.target.value)
                      }
                      placeholder="Envio gratis"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="img">
                      URL Imagen (Imagen de la oferta)
                    </Label>
                    <Input
                      id="img"
                      value={form.img}
                      onChange={(e) =>
                        handleChange("img", e.target.value)
                      }
                      placeholder="url"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="default"
                      checked={form.default}
                      onCheckedChange={(checked) =>
                        handleChange("default", checked === true)
                      }
                    />
                    <Label htmlFor="default" className="cursor-pointer">
                      ¿Predeterminado? (Solo uno puede estar activo)
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    {isEditing ? "Guardar Cambios" : "Añadir Descuento"}
                  </Button>

                  {isEditing && (
                    <Button
                      type="button"
                      onClick={() => {
                        setEditingIndex(null);
                        setForm(initialFormState);
                        setSelectedIndex(null);
                        setForm({
                          ...form,
                          ["variants"]: variantsOn,
                        });
                      }}
                      variant="outline"
                      className="w-full mt-2"
                    >
                      Cancelar Edición
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* TARJETA de SELECCIÓN y ACCIONES (Editar/Eliminar/Reordenar) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚙️ Gestionar y Reordenar ofertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="bundle-select" className="mb-2 block">
                  Selecciona una oferta:
                </Label>
                <Select
                  value={selectedIndex?.toString() ?? ""}
                  onValueChange={(value) => setSelectedIndex(Number(value))}
                >
                  <SelectTrigger className="flex-1" id="bundle-select">
                    <SelectValue placeholder="Selecciona un descuento" />
                  </SelectTrigger>
                  <SelectContent>
                    {discounts.map((d, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {`#${i + 1}: ${d.name} (x${d.quantity} - $${
                          d.pricefinal
                        }) ${d.default ? " (DEFAULT)" : ""}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2 mt-4">
                  {/* Botones de REORDENAMIENTO */}
                  <Button
                    onClick={() => handleReorder("up")}
                    disabled={selectedIndex === null || selectedIndex === 0}
                    variant="outline"
                    title="Mover hacia arriba"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleReorder("down")}
                    disabled={
                      selectedIndex === null ||
                      selectedIndex === discounts.length - 1
                    }
                    variant="outline"
                    title="Mover hacia abajo"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>

                  {/* Botones de EDICIÓN y ELIMINAR */}
                  <Button
                    onClick={startEditing}
                    disabled={selectedIndex === null || isEditing}
                    variant="default"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={selectedIndex === null}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
                {isEditing && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *Estás en **modo edición**. Clica en "Cancelar Edición" para
                    reordenar.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚙️ Tiene Variantes?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="variants"
                    checked={form.variants}
                    onCheckedChange={(checked) => {
                      handleChange("variants", checked === true);
                      setVariantsOn(checked === true);
                    }}
                  />
                  <Label htmlFor="variants" className="cursor-pointer">
                    (Marcar si el producto en tienda nube tiene uno o mas
                    variantes)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Opciones De complemento Card (mantener) */}


         



            {/* Opciones Visuales Card (mantener) */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Opciones visuales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bundleTitle">Título de las ofertas</Label>
                  <Input
                    id="bundleTitle"
                    value={bundleTitle}
                    onChange={(e) => setBundleTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borderColor">Borde</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="borderColor"
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountColor">Precio antes</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="discountColor"
                        type="color"
                        value={discountColor}
                        onChange={(e) => setDiscountColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={discountColor}
                        onChange={(e) => setDiscountColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labelBg">Etiquetas</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="labelBg"
                        type="color"
                        value={labelBackgroundColor}
                        onChange={(e) =>
                          setLabelBackgroundColor(e.target.value)
                        }
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={labelBackgroundColor}
                        onChange={(e) =>
                          setLabelBackgroundColor(e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview (mantener) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>👁️ Vista Previa</CardTitle>
              </CardHeader>
              <CardContent className="bg-secondary/30 rounded-lg p-6">



<div className="space-y-2">
  <Label>Seleccionar Estilo</Label>

  {/* Contenedor para los Radio Buttons */}
  <div className="flex items-center space-x-6">
    {/* Estilo Clásico */}
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id="styleClasico"
        name="designStyle" // Nombre común para agrupar los botones
        value="clasico"
        checked={ selectedStyle === 'clasico'}
        onChange={() => setSelectedStyle('clasico')}
        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" // Clases de estilo (ejemplo Tailwind)
      />
      <label htmlFor="styleClasico" className="font-medium text-gray-700">
        Clásico
      </label>
    </div>

    {/* Estilo Moderno */}
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id="styleModerno"
        name="designStyle" // Nombre común para agrupar los botones
        value="moderno"
        checked={ selectedStyle === 'moderno'}
        onChange={() => setSelectedStyle('moderno')}
        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" // Clases de estilo (ejemplo Tailwind)
      />
      <label htmlFor="styleModerno" className="font-medium text-gray-700">
        Moderno
      </label>
    </div>
  </div>
</div>

              { selectedStyle == "clasico" ? <>

  <Bundles1
                  discounts={discounts}
                  bundleTitle={bundleTitle}
                  colorBorder={borderColor}
                  colorDiscount={discountColor}
                  labelBackgroundColor={labelBackgroundColor}
                  onSelectQuantity={setSelectedQuantity}
                  variantsOn={variantsOn}
                  // Aquí deberías pasar la cantidad del bundle seleccionado por defecto
                  // si Bundles necesita saber cuál está seleccionado inicialmente en la vista previa
                />
</>:<> <Bundles2
                  discounts={discounts}
                  bundleTitle={bundleTitle}
                  colorBorder={borderColor}
                  colorDiscount={discountColor}
                  labelBackgroundColor={labelBackgroundColor}
                  onSelectQuantity={setSelectedQuantity}
                  variantsOn={variantsOn}
                  // Aquí deberías pasar la cantidad del bundle seleccionado por defecto
                  // si Bundles necesita saber cuál está seleccionado inicialmente en la vista previa
                /></>
              }
              
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleContainer;
