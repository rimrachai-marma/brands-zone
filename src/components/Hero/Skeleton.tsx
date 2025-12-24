// Skeleton rows for loading state
import { Skeleton } from "@/components/ui/skeleton";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
const SkeletonRow = () => (
    <TableRow>
        <TableCell>
            <div className="flex gap-2">
                <Skeleton className="w-12 h-12 rounded" />
                <Skeleton className="w-12 h-12 rounded" />
                <Skeleton className="w-12 h-12 rounded" />
            </div>
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-48" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
            <Skeleton className="h-6 w-16 rounded-full" />
        </TableCell>
        <TableCell>
            <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
            </div>
        </TableCell>
    </TableRow>
);
export default SkeletonRow;