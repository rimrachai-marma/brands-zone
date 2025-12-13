'use client';
import { Input } from "@/components/ui/input";
import { BrandSearchProps } from "@/types";



const BrandSearch = ({ value, onChange }: BrandSearchProps) => {
  return (
    <div>
      <Input
        placeholder="Search brands..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
       className="pl-9 h-15 hover:border-primary active:border-primary focus:border-primary focus-visible:shadow-none"
      />
    </div>
  );
};

export default BrandSearch;
