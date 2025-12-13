import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ProductFormData } from "@/schema/products/create";
import { Campaign } from "@/types";

interface Props {
  form: UseFormReturn<ProductFormData>;
  campaigns: Campaign[];
}

const DiscountSection: React.FC<Props> = ({ form, campaigns }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Campaign</CardTitle>
        <CardDescription>
          Optionally set a discount campaign for this product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="campaign_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Campaign</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? campaigns?.find(
                            (campaign) => campaign.id === field.value
                          )?.name
                        : "Select a campaign"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width)">
                  <Command>
                    <CommandInput placeholder="Search campaign..." />
                    <CommandList>
                      <CommandEmpty>No campaign found.</CommandEmpty>
                      <CommandGroup>
                        {campaigns.map((campaign) => (
                          <CommandItem
                            key={campaign.id}
                            value={campaign.id}
                            onSelect={() => {
                              form.setValue("campaign_id", campaign.id, {
                                shouldValidate: true,
                              });
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                campaign.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {campaign.name}
                            <span className="ml-auto text-xs text-muted-foreground">
                              {campaign.discount_percentage}% off
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Choose an existing campaign to apply to this product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default DiscountSection;
