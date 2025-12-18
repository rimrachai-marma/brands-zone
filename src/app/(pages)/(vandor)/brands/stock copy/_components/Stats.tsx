import StatsCard from "@/components/shared/StatsCard";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";

interface Props {
  totalProducts: number;
  totalVariants: number;
  lowStockCount: number;
  outOfStockCount: number;
}

const Stats: React.FC<Props> = ({
  totalProducts,
  totalVariants,
  lowStockCount,
  outOfStockCount,
}) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Products"
        icon={<Package className="h-4 w-4 text-slate-500 shrink-0" />}
      >
        <div className="text-xl sm:text-2xl font-bold">{totalProducts}</div>
        <p className="text-xs text-slate-500">{totalVariants} total variants</p>
      </StatsCard>

      <StatsCard
        title="In Stock"
        icon={<CheckCircle className="h-4 w-4 text-green-600 shrink-0" />}
      >
        <div className="text-xl sm:text-2xl font-bold text-green-600">
          {totalProducts - lowStockCount - outOfStockCount}
        </div>
        <p className="text-xs text-slate-500">Healthy stock levels</p>
      </StatsCard>
      <StatsCard
        title="Low Stock"
        icon={<AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
      >
        <div className="text-xl sm:text-2xl font-bold text-amber-600">
          {lowStockCount}
        </div>
        <p className="text-xs text-slate-500">Need reordering soon</p>
      </StatsCard>
      <StatsCard
        title="Out of Stock"
        icon={<AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />}
      >
        <div className="text-xl sm:text-2xl font-bold text-red-600">
          {outOfStockCount}
        </div>
        <p className="text-xs text-slate-500">Urgent action needed</p>
      </StatsCard>
    </div>
  );
};

export default Stats;
