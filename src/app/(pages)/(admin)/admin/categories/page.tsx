// app/categories/page.tsx
'use client';
import { CategoryList } from '@/app/(pages)/(admin)/admin/_components/category/CategoryList';
import { CategoryForm } from '@/app/(pages)/(admin)/admin/_components/category/CategoryForm';


export default function CategoriesPage() {


  return (
      <div className="container mx-auto py-6">
            <CategoryList />
      </div>
  );
}