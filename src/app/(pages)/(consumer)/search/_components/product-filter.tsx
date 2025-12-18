"use client";
import { Label } from "@/components/ui/label";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import React from "react";
import { useRouter } from "next/navigation";

const ProductFilter = ({ initialSort = "a-z" }) => {
    const router = useRouter();
    const [sortOrder, setSortOrder] = React.useState<string>(initialSort);

    const handleSortChange = (value: string) => {
        if (value === sortOrder) return;

        setSortOrder(value);

        const params = new URLSearchParams(window.location.search);
        params.set("sort", value);
        params.delete("page");

        const newUrl = `?${params.toString()}`;
        router.push(newUrl, { scroll: false });
    };


    return (
        <div className="flex flex-wrap gap-6 items-center justify-between">
            <div>
                <p>Total products showing: {/* You can pass this as a prop */}</p>
            </div>
            <div className="flex items-center gap-12">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-4 space-y-1">
                    <Label htmlFor="sort">Sort: </Label>
                    <Select
                        value={sortOrder}
                        onValueChange={handleSortChange}
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select sort order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a-z">Name: A - Z</SelectItem>
                            <SelectItem value="z-a">Name: Z - A</SelectItem>
                            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="featured">Featured</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;