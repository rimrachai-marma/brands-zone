"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const ProductSearch = ({ initialKeyword = "" }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(initialKeyword);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (debouncedSearchQuery) {
            params.set("keyword", debouncedSearchQuery);
            params.delete("page");
        } else {
            params.delete("keyword");
        }

        const newUrl = `?${params.toString()}`;

        if (newUrl !== window.location.search) {
            router.push(newUrl, { scroll: false });
        }
    }, [debouncedSearchQuery, router]);

    // Update local state when initialKeyword changes (from URL)
    useEffect(() => {
        setSearchQuery(initialKeyword);
    }, [initialKeyword]);

    return (
        <div>
            <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-12 hover:border-primary active:border-primary focus:border-primary focus-visible:shadow-none"
            />
        </div>
    );
};

export default ProductSearch;