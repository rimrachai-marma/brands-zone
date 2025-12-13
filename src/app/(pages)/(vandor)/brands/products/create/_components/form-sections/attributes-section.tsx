"use client";
import React, { useState } from "react";
import { UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Tag, Palette, List, Trash2 } from "lucide-react";
import { ProductFormData } from "@/schema/products/create";

interface Props {
  form: UseFormReturn<ProductFormData>;
}

function AttributeItem({
  form,
  index,
  onRemove,
}: {
  form: UseFormReturn<ProductFormData>;
  index: number;
  onRemove: () => void;
}) {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: `attributes.${index}.options`,
  });

  const [optionInput, setOptionInput] = useState({
    label: "",
    value: "",
    hex: "#000000",
  });

  // Use useWatch to track attribute type changes
  const attributeType = useWatch({
    control: form.control,
    name: `attributes.${index}.type`,
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleAttributeNameChange = (name: string) => {
    form.setValue(`attributes.${index}.name`, name, { shouldValidate: true });
    const slug = generateSlug(name);
    form.setValue(`attributes.${index}.slug`, slug, { shouldValidate: true });
  };

  const handleOptionInputChange = (
    field: "label" | "value" | "hex",
    value: string
  ) => {
    const updates = { ...optionInput, [field]: value };

    if (field === "label") {
      updates.value = generateSlug(value);
    }

    setOptionInput(updates);
  };

  const addOption = () => {
    if (!optionInput.label || !optionInput.value) return;

    // Check for duplicate values
    const currentOptions = form.getValues(`attributes.${index}.options`) || [];

    if (currentOptions.some((opt) => opt.value === optionInput.value)) {
      form.setError(`attributes.${index}.options`, {
        type: "manual",
        message: "Option value must be unique",
      });
      return;
    }

    const newOption: { value: string; label: string; metadata?: object } = {
      value: optionInput.value,
      label: optionInput.label,
    };

    if (attributeType === "color" && optionInput.hex) {
      newOption.metadata = { hex: optionInput.hex };
    }

    appendOption(newOption);
    form.trigger("variants");
    form.clearErrors(`attributes.${index}.options`);
    setOptionInput({ label: "", value: "", hex: "#000000" });
  };

  const handleRemoveOption = (optionIndex: number) => {
    removeOption(optionIndex);
    form.trigger("variants");
  };

  const getPlaceholders = (type: string) => {
    if (type === "color") {
      return {
        label: "e.g., Navy Blue, Red",
        value: "e.g., navy-blue, red",
        description: "Add color options with their hex values",
      };
    }
    return {
      label: "e.g., M, L. Ram, Storage",
      value: "e.g., m, l",
      description: "Add options for this attribute",
    };
  };

  const placeholders = getPlaceholders(attributeType || "select");
  const optionsError = form.formState.errors.attributes?.[index]?.options;

  return (
    <div className="border-2 rounded-lg p-6 space-y-6 bg-linear-to-br from-white to-gray-50">
      {/* Attribute Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {attributeType === "color" ? (
            <Palette className="h-5 w-5 text-purple-600" />
          ) : (
            <List className="h-5 w-5 text-blue-600" />
          )}

          <span className="font-semibold text-lg">Attribute {index + 1}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-red-50 hover:text-red-600"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Attribute Name & Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <FormField
          control={form.control}
          name={`attributes.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Attribute Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Color, Size, Material"
                  {...field}
                  onChange={(e) => handleAttributeNameChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`attributes.${index}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger(`attributes.${index}`);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="select">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4" />
                      <span>Select (Text)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="color">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span>Color</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Slug */}
      <FormField
        control={form.control}
        name={`attributes.${index}.slug`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug (Auto-generated)</FormLabel>
            <FormControl>
              <Input
                {...field}
                readOnly
                className="bg-gray-100 font-mono text-sm"
              />
            </FormControl>
            <FormDescription>
              Used internally to identify this attribute
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Options Section */}
      <div
        className={`bg-white p-4 rounded-lg border-2 ${
          optionsError ? "border-red-300" : "border-gray-200"
        }`}
      >
        <FormLabel className="text-base font-semibold mb-2 block">
          Options <span className="text-red-500">*</span>
        </FormLabel>
        <FormDescription className="mb-4">
          {placeholders.description}
        </FormDescription>

        {/* Add Option Inputs */}
        <div className="space-y-3 mb-4">
          <div
            className={`grid gap-2 ${
              attributeType === "color"
                ? "grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto]"
                : "grid-cols-1 sm:grid-cols-[1fr_1fr_auto]"
            }`}
          >
            <Input
              placeholder={placeholders.label}
              value={optionInput.label}
              onChange={(e) => handleOptionInputChange("label", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addOption();
                }
              }}
            />
            <Input
              placeholder={placeholders.value}
              value={optionInput.value}
              onChange={(e) => handleOptionInputChange("value", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addOption();
                }
              }}
              className="font-mono text-sm"
            />
            {attributeType === "color" && (
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={optionInput.hex}
                  onChange={(e) =>
                    handleOptionInputChange("hex", e.target.value)
                  }
                  className="flex-1 h-10 w-14 p-1 cursor-pointer"
                  title="Pick color"
                />
                <Input
                  type="text"
                  placeholder="#000000"
                  value={optionInput.hex}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                      handleOptionInputChange("hex", value);
                    }
                  }}
                  className="font-mono text-sm flex-1"
                  maxLength={7}
                />
              </div>
            )}
            <div className="w-full">
              <Button
                type="button"
                onClick={addOption}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Display Added Options */}
        {optionFields.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {optionFields.map((option, optionIndex) => (
              <Badge
                key={option.id}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5"
              >
                {attributeType === "color" && option.metadata?.hex && (
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: option.metadata.hex }}
                  />
                )}
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-gray-500">({option.value})</span>
                {attributeType === "color" && option.metadata?.hex && (
                  <span className="text-xs text-gray-400 font-mono">
                    {option.metadata.hex}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveOption(optionIndex)}
                  className="ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {optionFields.length === 0 && (
          <div className="text-center py-6 text-gray-400 text-sm">
            No options added yet
          </div>
        )}

        {optionsError && (
          <p className="text-sm font-medium text-red-600 mt-3">
            {String(optionsError.message)}
          </p>
        )}
      </div>
    </div>
  );
}

export function AttributesSection({ form }: Props) {
  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const handleRemoveAttribute = (index: number) => {
    removeAttribute(index);
    form.trigger("variants");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Product Attributes
        </CardTitle>
        <CardDescription>
          Define attributes like color, size, material, etc. These will be used
          to create product variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {attributeFields.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg bg-gray-50">
              <Tag className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">No attributes yet</p>
              <p className="text-xs text-gray-500 mb-4">
                Add attributes to enable product variants with different colors,
                sizes, etc.
              </p>
            </div>
          )}

          {attributeFields.map((field, index) => (
            <AttributeItem
              key={field.id}
              form={form}
              index={index}
              onRemove={() => handleRemoveAttribute(index)}
            />
          ))}

          {/* Quick Add Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                appendAttribute({
                  name: "Size",
                  slug: "size",
                  type: "select",
                  options: [
                    { label: "S", value: "s" },
                    { label: "M", value: "m" },
                    { label: "L", value: "l" },
                    { label: "XL", value: "xl" },
                    { label: "XXL", value: "xxl" },
                  ],
                });
              }}
              className="h-12 border-2 hover:border-blue-500 hover:bg-blue-50"
            >
              <List className="h-5 w-5 mr-2" />
              Quick Add Size
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                appendAttribute({
                  name: "Color",
                  slug: "color",
                  type: "color",
                  options: [
                    {
                      label: "Black",
                      value: "black",
                      metadata: { hex: "#000000" },
                    },
                    {
                      label: "White",
                      value: "white",
                      metadata: { hex: "#FFFFFF" },
                    },
                    {
                      label: "Red",
                      value: "red",
                      metadata: { hex: "#EF4444" },
                    },
                    {
                      label: "Blue",
                      value: "blue",
                      metadata: { hex: "#3B82F6" },
                    },
                    {
                      label: "Green",
                      value: "green",
                      metadata: { hex: "#10B981" },
                    },
                  ],
                });
              }}
              className="h-12 border-2 hover:border-purple-500 hover:bg-purple-50"
            >
              <Palette className="h-5 w-5 mr-2" />
              Quick Add Color
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendAttribute({
                  name: "",
                  slug: "",
                  type: "select",
                  options: [],
                })
              }
              className="h-12 border-2 border-dashed hover:border-solid hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Custom
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
