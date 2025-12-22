// hooks/useCategories.ts
import {useCallback, useState} from 'react';
import {Category} from '@/types/category';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryBySlug,
    getCategoryTree,
    toggleCategoryStatus,
    updateCategory,
} from '@/lib/actions/categories';

export function useCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            return await getCategories(params);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch categories');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCategory = useCallback(async (slug: string, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            return await getCategoryBySlug(slug, options);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch category');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addCategory = useCallback(async (data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
        setLoading(true);
        setError(null);

        try {
            return await createCategory(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create category');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const modifyCategory = useCallback(async (slug: string, data: Partial<Category>) => {
        setLoading(true);
        setError(null);

        try {
            return await updateCategory(slug, data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update category');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeCategory = useCallback(async (slug: string) => {
        setLoading(true);
        setError(null);

        try {
            return await deleteCategory(slug);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete category');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleStatus = useCallback(async (slug: string) => {
        setLoading(true);
        setError(null);

        try {
            return await toggleCategoryStatus(slug);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to toggle status');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCategoryTree = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            return await getCategoryTree();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch category tree');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        fetchCategories,
        fetchCategory,
        addCategory,
        modifyCategory,
        removeCategory,
        toggleStatus,
        fetchCategoryTree,
    };
}