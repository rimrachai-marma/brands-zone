import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {Categories as CategoriesType, Category} from "@/types";
import { ChevronLeft, ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {sidebarCategories} from "@/constant/ctgr";

interface Props {
  categories: CategoriesType;
}

const Categories: React.FC<Props> = ({ categories }) => {
  const [navigationStack, setNavigationStack] = useState<(string | null)[]>([
    null,
  ]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const findCategoryById = (
    categories: CategoriesType,
    id: string
  ): sidebarCategories | null => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
      for (const cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const getCurrentCategories = (): Category[] |any => {
    const currentId = navigationStack[currentLevel];
    if (!currentId) return categories;

    const category = findCategoryById(categories, currentId);
    return category?.children || [];
  };

  const getCurrentCategoryName = (): string => {
    const currentId = navigationStack[currentLevel];
    if (!currentId) return "All Categories";

    const category = findCategoryById(categories, currentId);
    return category?.name || "All Categories";
  };

  const navigateForward = (categoryId: string) => {
    const category = findCategoryById(categories, categoryId);
    if (category?.children && category.children.length > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection("forward");
      setTimeout(() => {
        setNavigationStack([
          ...navigationStack.slice(0, currentLevel + 1),
          categoryId,
        ]);
        setCurrentLevel(currentLevel + 1);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  };

  const navigateBack = () => {
    if (currentLevel > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection("back");
      setTimeout(() => {
        setCurrentLevel(currentLevel - 1);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  };

  const navigateToRoot = () => {
    if (currentLevel > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection("back");
      setTimeout(() => {
        setCurrentLevel(0);
        setNavigationStack([null]);
        setTimeout(() => setIsAnimating(false), 100);
      }, 300);
    }
  };

  const getParentCategoryName = (): string => {
    if (currentLevel <= 1) return "All Categories";
    const parentId = navigationStack[currentLevel - 1];
    if (!parentId) return "All Categories";
    const parentCategory = findCategoryById(categories, parentId);
    return parentCategory?.name || "Back";
  };

  const CategoryItem = ({
    category,
    index,
  }: {
    category: sidebarCategories;
    index: number;
  }) => {
    const hasChildren = category.children && category.children.length > 0;

    return (
      <Button
        variant="ghost"
        className={`w-full justify-between h-auto py-3 px-4 transition-all ${
          isAnimating
            ? direction === "forward"
              ? "animate-slideOutLeft"
              : "animate-slideOutRight"
            : "animate-slideInRight"
        }`}
        style={{
          animationDelay: isAnimating ? "0ms" : `${index * 40}ms`,
        }}
        onClick={() => hasChildren && navigateForward(category.id)}
      >
        <Link href="#">
          <span className="text-sm font-normal text-left">{category.name}</span>
        </Link>

        {hasChildren && (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    );
  };

  return (
    <>
      <div className="border-b">
        {currentLevel > 0 && (
          <>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              onClick={navigateToRoot}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="font-medium">All Categories</span>
            </button>
            <Separator />
          </>
        )}

        {/* Parent Category Link */}
        {currentLevel > 1 && (
          <>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              onClick={navigateBack}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="font-medium">{getParentCategoryName()}</span>
            </button>
            <Separator />
          </>
        )}

        {/* Current Category Title */}
        <div className="px-4 py-4 bg-muted/50 flex gap-2 items-center">
          <FolderOpen className="w-4 h-4 shrink-0" />
          <h3
            className={` font-semibold transition-all duration-400 ease-out ${
              isAnimating
                ? direction === "forward"
                  ? "opacity-0 transform translate-x-8"
                  : "opacity-0 transform -translate-x-8"
                : "opacity-100 transform translate-x-0"
            }`}
          >
            {getCurrentCategoryName()}
          </h3>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-1 p-2">
        {getCurrentCategories().map((category, index) => (
          <CategoryItem key={category.id} category={category} index={index} />
        ))}
      </div>
    </>
  );
};

export default Categories;
