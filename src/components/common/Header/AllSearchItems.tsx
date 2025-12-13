"use client";

import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { SearchItem } from "@/types";

// ✅ Define the data structure for search results


// ✅ Mock fetch function (replace with your backend API endpoint)
async function fetchSearchResults(query: string): Promise<SearchItem[]> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

const AllSearchItems = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Debounced search function using lodash
  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchSearchResults(q);
        setResults(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch results");
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // ✅ Run search when query changes
  useEffect(() => {
    if (query) {
      debouncedSearch(query);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <Input
          placeholder="Search for products, categories, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 h-15 hover:border-primary active:border-primary focus:border-primary focus-visible:shadow-none"
        />
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[110%] left-0 w-full bg-white border border-gray-200  shadow-lg"
          >
            <Command className="w-full">
              {isLoading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-8 w-full " />
                  ))}
                </div>
              ) : error ? (
                <div className="p-4 text-sm text-red-500">{error}</div>
              ) : results.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">
                  No results found
                </div>
              ) : (
                <CommandGroup heading="Results">
                  {results.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        setIsOpen(false);
                        setQuery(item.title);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 cursor-pointer",
                        "hover:bg-primary hover:text-white transition-colors"
                      )}
                    >
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-8 h-8  object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        {item.description && (
                          <span className="text-sm text-gray-500 truncate max-w-[250px]">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </Command>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllSearchItems;
