// components/category/CategoryTreeView.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { getCategoryTree } from '@/lib/actions/categories';
import { Category } from '@/types/category';

interface TreeNodeProps {
    category: Category;
    level?: number;
}

function TreeNode({ category, level = 0 }: TreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    return (
        <div>
            <div
                className="flex items-center gap-2 py-2 hover:bg-accent px-2 rounded cursor-pointer"
                style={{ paddingLeft: `${level * 1.5}rem` }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {hasChildren ? (
                    isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )
                ) : (
                    <div className="w-4" />
                )}
                {isExpanded ? (
                    <FolderOpen className="h-4 w-4" />
                ) : (
                    <Folder className="h-4 w-4" />
                )}
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
          ({category.products_count || 0} products)
        </span>
            </div>
            {isExpanded && hasChildren && (
                <div>
                    {category.children!.map((child) => (
                        <TreeNode
                            key={child.id}
                            category={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function CategoryTreeView() {
    const [tree, setTree] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTree();
    }, []);

    const fetchTree = async () => {
        try {
            const response = await getCategoryTree();
            if (response.status === 'success') {
                setTree(response.data.categories_tree);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load category tree');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading category tree...</div>;
    if (error) return <div className="text-destructive">{error}</div>;

    return (
        <div className="border rounded-lg p-4">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Category Hierarchy</h3>
                <p className="text-sm text-muted-foreground">
                    Click on categories to expand/collapse
                </p>
            </div>
            <div className="space-y-1">
                {tree.map((category) => (
                    <TreeNode key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}