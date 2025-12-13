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
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Props<T extends { id: string; name: string }> {
  value: string;
  onSelect: (id: string) => void;
  results: T[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
}

function AsyncCombobox<T extends { id: string; name: string }>({
  value,
  onSelect,
  results,
  isLoading,
  onSearch,
  placeholder,
  label,
  disabled = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedItem = results.find((item) => item.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedItem ? selectedItem.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${label.toLowerCase()}...`}
            value={searchQuery}
            onValueChange={(val) => {
              setSearchQuery(val);
              onSearch(val);
            }}
          />
          <CommandList>
            {isLoading && (
              <div className="py-6 text-center text-sm">Loading...</div>
            )}

            {!isLoading && results.length === 0 && searchQuery && (
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            )}

            {!isLoading && results.length > 0 && (
              <CommandGroup>
                {results.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => {
                      onSelect(item.id);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AsyncCombobox;
