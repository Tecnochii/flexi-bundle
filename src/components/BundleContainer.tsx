import { useState } from "react";
import Bundles from "./Bundles";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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

const BundleContainer = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      label: "MAS COMPRADO",
      quantity: 1,
      subtitle: "3 cuotas sin interés",
      priceOriginal: "71.999,00",
      priceFinal: "44.999,00",
      labelText: "Envio gratis",
      name: "1 Unidad",
    },
    {
      label: "MAS COMPRADO",
      quantity: 2,
      subtitle: "3 cuotas sin interés",
      priceOriginal: "143.998,00",
      priceFinal: "76.498,30",
      default: true,
      labelText: "Envio gratis",
      name: "2 Unidades",
    },
    {
      label: "MAS COMPRADO",
      quantity: 3,
      subtitle: "3 cuotas sin interés",
      priceOriginal: "215.997,00",
      priceFinal: "101.247,75",
      labelText: "Envio gratis",
      name: "3 Unidades",
    },
  ]);

  const [form, setForm] = useState<Discount>({
    label: "",
    quantity: 1,
    subtitle: "3 cuotas sin interés",
    priceOriginal: "",
    priceFinal: "",
    default: false,
    labelText: "Envio gratis",
    name: "1 Unidad",
  });

  const [borderColor, setBorderColor] = useState("#3b82f6");
  const [discountColor, setDiscountColor] = useState("#ef4444");
  const [labelBackgroundColor, setLabelBackgroundColor] = useState("#fbbf24");
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
      priceOriginal: "",
      priceFinal: "",
      default: false,
      labelText: "Envio gratis",
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
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
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="1 Unidad"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
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
                    <Label htmlFor="priceOriginal">Precio Original</Label>
                    <Input
                      id="priceOriginal"
                      value={form.priceOriginal}
                      onChange={(e) => handleChange("priceOriginal", e.target.value)}
                      placeholder="71.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priceFinal">Precio Final</Label>
                    <Input
                      id="priceFinal"
                      value={form.priceFinal}
                      onChange={(e) => handleChange("priceFinal", e.target.value)}
                      placeholder="44.999,00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="labelText">Texto de Etiqueta</Label>
                    <Input
                      id="labelText"
                      value={form.labelText}
                      onChange={(e) => handleChange("labelText", e.target.value)}
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
                          {`Opción ${i + 1}: x${d.quantity} - $${d.priceFinal}`}
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
