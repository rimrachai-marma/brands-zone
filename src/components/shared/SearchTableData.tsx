"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import React from "react";

interface Props {
  placeholder: string;
}

const SearchTableData: React.FC<Props> = ({ placeholder }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("keyword") || "";

  const handleSearch = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("keyword", value);
      } else {
        params.delete("keyword");
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const debouncedSearch = React.useMemo(
    () => debounce((value: string) => handleSearch(value), 300),
    [handleSearch]
  );

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10"
        defaultValue={search}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchTableData;
