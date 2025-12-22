// app/categories/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryList } from '@/app/(pages)/(admin)/admin/_components/category/CategoryList';
import { CategoryForm } from '@/app/(pages)/(admin)/admin/_components/category/CategoryForm';
import { CategoryTreeView } from '@/app/(pages)/(admin)/admin/_components/category/CategoryTreeView';
import { Plus } from 'lucide-react';
import { useCategories } from '@/hooks/category/useCategories';

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const { fetchCategories } = useCategories();



  return (
      <div className="container mx-auto py-6">
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="tree">Tree View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <CategoryList />
          </TabsContent>

          <TabsContent value="tree">
            <CategoryTreeView />
          </TabsContent>
        </Tabs>
      </div>
  );
}