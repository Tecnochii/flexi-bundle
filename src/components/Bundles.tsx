import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
  discounts: Discount[];
  bundleTitle: string;
  colorBorder: string;
  colorDiscount: string;
  labelBackgroundColor: string;
  onSelectQuantity?: (quantity: number) => void;
  selectedQuantity?: number;
}

const Bundles = ({
  discounts,
  bundleTitle,
  colorBorder,
  colorDiscount,
  labelBackgroundColor,
  onSelectQuantity,
  selectedQuantity,
}: BundlesProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
        {bundleTitle}
      </h2>
      <div className="space-y-3">
        {discounts.map((discount, index) => {
          const isSelected = selectedQuantity === discount.quantity;
          const discountPercentage = Math.round(
            ((parseFloat(discount.priceOriginal.replace(/\./g, "").replace(",", ".")) -
              parseFloat(discount.priceFinal.replace(/\./g, "").replace(",", "."))) /
              parseFloat(discount.priceOriginal.replace(/\./g, "").replace(",", "."))) *
              100
          );

          return (
            <div
              key={index}
              onClick={() => onSelectQuantity?.(discount.quantity)}
              className={cn(
                "relative rounded-lg p-4 transition-all cursor-pointer hover:shadow-md",
                isSelected ? "border-2 ring-2 ring-offset-2" : "border-2"
              )}
              style={{
                borderColor: isSelected ? colorBorder : "#e5e7eb",
                ...(isSelected && { 
                  boxShadow: `0 0 0 3px ${colorBorder}20`
                }),
              }}
            >
              {discount.default && (
                <div
                  className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold rounded"
                  style={{ backgroundColor: labelBackgroundColor, color: "#000" }}
                >
                  {discount.label}
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                    isSelected ? "border-[6px]" : "border-2 border-gray-300"
                  )}
                  style={{
                    borderColor: isSelected ? colorBorder : "#d1d5db",
                  }}
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-foreground">
                      {discount.name || `${discount.quantity} Unidad${discount.quantity > 1 ? "es" : ""}`}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {discount.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  {discountPercentage > 0 && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded inline-block mb-1"
                      style={{ backgroundColor: colorDiscount, color: "#fff" }}
                    >
                      -{discountPercentage}%
                    </span>
                  )}
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-red-500 line-through">
                      ${discount.priceOriginal}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      ${discount.priceFinal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bundles;
