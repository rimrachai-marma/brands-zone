"use client";
import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { ProductFormData } from "@/schema/products/create";

interface Props {
  form: UseFormReturn<ProductFormData>;
  newSpecKey: string;
  setNewSpecKey: (value: string) => void;
  newSpecValue: string;
  setNewSpecValue: (value: string) => void;
}

export function SpecificationsSection({
  form,
  newSpecKey,
  setNewSpecKey,
  newSpecValue,
  setNewSpecValue,
}: Props) {
  const specifications = useWatch({
    control: form.control,
    name: "specifications",
    defaultValue: {},
  });

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      form.setValue(
        "specifications",
        { ...specifications, [newSpecKey.trim()]: newSpecValue.trim() },
        { shouldValidate: true, shouldDirty: true }
      );
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    form.setValue("specifications", newSpecs, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
        <CardDescription>
          Add technical specifications and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Specification name (e.g., Processor)"
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSpecification();
                }
              }}
            />
            <Input
              placeholder="Specification value (e.g., Intel i7)"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSpecification();
                }
              }}
            />
            <Button type="button" onClick={addSpecification} variant="outline">
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </div>
          {specifications && Object.entries(specifications).length > 0 && (
            <div className="space-y-2">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <span className="font-medium">{key}:</span>{" "}
                    <span className="text-gray-700">{value}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
