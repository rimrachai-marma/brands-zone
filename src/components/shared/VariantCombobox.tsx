import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

interface VariantComboboxProps {
  value: string;
  onSelect: (id: string) => void;
  variants: ProductVariant[];
  disabled?: boolean;
}

function VariantCombobox({
  value,
  onSelect,
  variants,
  disabled = false,
}: VariantComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedVariant = variants.find((v) => v.id === value);

  const formatVariant = (variant: ProductVariant) => {
    const preferredOrder = ["color", "size"];

    const attrs = Object.entries(variant.attributes)
      .sort(([a], [b]) => preferredOrder.indexOf(a) - preferredOrder.indexOf(b))
      .map(([, val]) => val.charAt(0).toUpperCase() + val.slice(1))
      .join(" / ");

    return {
      label: attrs || "Default",
      sku: variant.sku,
    };
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || variants.length === 0}
        >
          {selectedVariant
            ? formatVariant(selectedVariant).label
            : "Select variant..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search variant..." />
          <CommandList>
            <CommandEmpty>No variant found.</CommandEmpty>
            <CommandGroup>
              {variants.map((variant) => {
                const formatted = formatVariant(variant);

                return (
                  <CommandItem
                    key={variant.id}
                    value={variant.id}
                    onSelect={() => {
                      onSelect(variant.id);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{formatted.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatted.sku}
                      </span>
                    </div>

                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === variant.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default VariantCombobox;
