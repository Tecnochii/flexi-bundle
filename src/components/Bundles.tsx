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
              className="relative rounded-lg p-4 border-2 transition-all cursor-pointer hover:shadow-md"
              style={{
                borderColor: colorBorder,
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

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-foreground">
                      {discount.name || `${discount.quantity} Unidad${discount.quantity > 1 ? "es" : ""}`}
                    </span>
                    {discountPercentage > 0 && (
                      <span
                        className="text-sm font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: colorDiscount, color: "#fff" }}
                      >
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {discount.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      ${discount.priceOriginal}
                    </span>
                    <span className="text-2xl font-bold" style={{ color: colorDiscount }}>
                      ${discount.priceFinal}
                    </span>
                  </div>
                  {discount.labelText && (
                    <p className="text-xs font-medium mt-2" style={{ color: colorDiscount }}>
                      {discount.labelText}
                    </p>
                  )}
                </div>

                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                    isSelected ? "" : "border-2 border-muted-foreground"
                  )}
                  style={{
                    backgroundColor: isSelected ? colorBorder : "transparent",
                  }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
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
