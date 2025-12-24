import {Skeleton} from "@/components/ui/skeleton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function CategoryTableSkeleton({rows = 5}: { rows?: number }) {
    return (
        <>
            {Array.from({length: rows}).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className="h-6 w-32"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-24"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-16"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20"/>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full"/>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

// Skeleton for filter controls
function FilterSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
                <Skeleton className="h-10 w-64"/>
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-[180px]"/>
                <Skeleton className="h-10 w-[180px]"/>
                <Skeleton className="h-10 w-[180px]"/>
            </div>
        </div>
    );
}

// Skeleton for pagination
function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40"/>
            <div className="flex gap-2">
                <Skeleton className="h-9 w-20"/>
                <Skeleton className="h-9 w-24"/>
                <Skeleton className="h-9 w-20"/>
            </div>
        </div>
    );
}

export function TableSkeleton() {
    return (
        <>
            <FilterSkeleton/>
            <div className="border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Parent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <CategoryTableSkeleton rows={10}/>
                    </TableBody>
                </Table>
            </div>
            <PaginationSkeleton/>
        </>
    )
}