"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormData } from "@/schema/products/create";
import { Brand, Category } from "@/types";

interface Props {
  brands: Brand[];
  categories: Category[];
  form: UseFormReturn<ProductFormData>;
  setBrandName: (name: string) => void;
}

export function BasicInformationSection({
  form,
  brands,
  categories,
  setBrandName,
}: Props) {
  const [brandOpen, setBrandOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details about your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Brand *</FormLabel>
              <Popover open={brandOpen} onOpenChange={setBrandOpen}>
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
                        ? brands.find((brand) => brand.id === field.value)?.name
                        : "Select a brand"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width)">
                  <Command>
                    <CommandInput placeholder="Search brand..." />
                    <CommandList>
                      <CommandEmpty>No brand found.</CommandEmpty>
                      <CommandGroup>
                        {brands.map((brand) => (
                          <CommandItem
                            key={brand.id}
                            value={brand.id}
                            onSelect={() => {
                              form.setValue("brand_id", brand.id, {
                                shouldValidate: true,
                              });
                              setBrandName(brand.name);
                              setBrandOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                brand.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {brand.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories *</FormLabel>
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select categories..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {categories.map((category) => (
                      <MultiSelectItem key={category.id} value={category.id}>
                        {category.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
