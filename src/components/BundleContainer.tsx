import { useEffect, useState } from "react";
import Bundles from "./Bundles";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { log } from "console";
import BotonVolver from "./BotonVolver";
import BotonLogout from "./BotonLogout";

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

const BundleContainer = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      label: "MAS COMPRADO",
      quantity: 1,
      subtitle: "3 cuotas sin interés",
      priceoriginal: "71.999,00",
      pricefinal: "44.999,00",
      labeltext: "Envio gratis",
      name: "1 Unidad",
    }
 
    
  ]);

  const [form, setForm] = useState<Discount>({
    label: "",
    quantity: 1,
    subtitle: "3 cuotas sin interés",
    priceoriginal: "",
    pricefinal: "",
    default: false,
    labeltext: "Envio gratis",
    name: "1 Unidad",
  });

  const [borderColor, setBorderColor] = useState("");
  const [discountColor, setDiscountColor] = useState("");
  const [labelBackgroundColor, setLabelBackgroundColor] = useState("");
  const [bundleTitle, setBundleTitle] = useState("¡GANÁ comprando POR CANTIDAD!");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(2);

  const handleChange = (field: keyof Discount, value: string | number | boolean) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount: Discount = {
      ...form,
      quantity: Number(form.quantity),
    };
    setDiscounts([...discounts, newDiscount]);
    setForm({
      label: "",
      quantity: 1,
      subtitle: "3 cuotas sin interés",
      priceoriginal: "",
      pricefinal: "",
      default: false,
      labeltext: "Envio gratis",
      name: "1 Unidad",
    });
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const newDiscounts = discounts.filter((_, i) => i !== selectedIndex);
      setDiscounts(newDiscounts);
      setSelectedIndex(null);
    }
  };


  const [products, setProducts] = useState(discounts);


function obtenerCookie(nombre) {
    // 1. Prepara el nombre a buscar (asegura el signo = al final)
    const nombreBuscado = nombre + "=";

    // 2. Decodifica la cadena completa de cookies para manejar caracteres especiales
    //    y la divide en un array de cookies individuales
    const cookiesArray = decodeURIComponent(document.cookie).split(';');

    // 3. Itera sobre cada elemento (cookie) en el array
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];

        // 4. Elimina los espacios en blanco iniciales (del separador '; ')
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        // 5. Comprueba si el elemento actual comienza con el nombre buscado
        if (cookie.indexOf(nombreBuscado) === 0) {
            // 6. Si coincide, devuelve el valor (la parte que sigue a nombreBuscado)
            return cookie.substring(nombreBuscado.length, cookie.length);
        }
    }

    // 7. Si el bucle termina sin encontrar la cookie, devuelve null
    return null;
}

useEffect(() => {
    let access_token =  obtenerCookie('access_token');
    console.log(access_token);
    

    let param = new URLSearchParams(window.location.search);
    let product_id = param.get('id');
    console.log(product_id);


   if(access_token){
    let urlLoginTest = "https://n8n-n8n.qxzsxx.easypanel.host/webhook/ofertas?access_token="+access_token+"&product_id="+product_id;
      fetch(urlLoginTest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
    setBorderColor(data[0].product.color_border);
    setLabelBackgroundColor(data[0].product.background_label_color);
    setDiscountColor(data[0].product.color_discount);
    setBundleTitle(data[0].product.bundle_title);
    setDiscounts(data[0].ofertas);

  })
 
    
   }
},[])


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
            Crea y gestiona ofertas por cantidad con vista previa en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Add New Offer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Agregar nueva oferta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Input
                    required

                      id="label"
                      value={form.label}
                      onChange={(e) => handleChange("label", e.target.value)}
                      placeholder="MAS COMPRADO"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                    required

                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="1 Unidad"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                    required

                      id="quantity"
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) => handleChange("quantity", Number(e.target.value))}
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
                    <Label htmlFor="priceoriginal">Precio Original</Label>
                    <Input
                    required

                      id="priceoriginal"
                      value={form.priceoriginal}
                      onChange={(e) => handleChange("priceoriginal", e.target.value)}
                      placeholder="71.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricefinal">Precio Final</Label>
                    <Input
                    required
                      id="pricefinal"
                      value={form.pricefinal}
                      onChange={(e) => handleChange("pricefinal", e.target.value)}
                      placeholder="44.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labeltext">Texto de Etiqueta</Label>
                    <Input

                      id="labeltext"
                      value={form.labeltext}
                      onChange={(e) => handleChange("labeltext", e.target.value)}
                      placeholder="Envio gratis"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="default"
                      checked={form.default}
                      onCheckedChange={(checked) => handleChange("default", checked === true)}
                    />
                    <Label htmlFor="default" className="cursor-pointer">
                      ¿Predeterminado?
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Añadir Descuento
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Delete Discount Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Eliminar descuento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Select
                    value={selectedIndex?.toString() ?? ""}
                    onValueChange={(value) => setSelectedIndex(Number(value))}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecciona un descuento" />
                    </SelectTrigger>
                    <SelectContent>
                      {discounts.map((d, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {`Opción ${i + 1}: x${d.quantity} - $${d.pricefinal}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleDelete}
                    disabled={selectedIndex === null}
                    variant="destructive"
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Visual Options Card */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Opciones visuales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bundleTitle">Título del bundle</Label>
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
                    <Label htmlFor="discountColor">Descuento</Label>
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
                    <Label htmlFor="labelBg">Etiqueta</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="labelBg"
                        type="color"
                        value={labelBackgroundColor}
                        onChange={(e) => setLabelBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={labelBackgroundColor}
                        onChange={(e) => setLabelBackgroundColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>👁️ Vista Previa</CardTitle>
              </CardHeader>
              <CardContent className="bg-secondary/30 rounded-lg p-6">
                <Bundles
                  discounts={discounts}
                  bundleTitle={bundleTitle}
                  colorBorder={borderColor}
                  colorDiscount={discountColor}
                  labelBackgroundColor={labelBackgroundColor}
                  onSelectQuantity={setSelectedQuantity}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleContainer;
