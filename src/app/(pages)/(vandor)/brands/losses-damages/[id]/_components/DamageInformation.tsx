import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProductDamage, ProductDamageItem } from "@/types/product-loss-damage";
import { formatDate } from "@/utils/formaters";

interface Props {
  productDamage: ProductDamage;
}

const DamageInformation: React.FC<Props> = ({ productDamage }) => {
  const getDamageTypeBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
      physical: "bg-red-100 text-red-800 hover:bg-red-100",
      water: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      fire: "bg-red-100 text-red-800 hover:bg-red-100",
      expired: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      manufacturing_defect:
        "bg-orange-100 text-orange-800 hover:bg-orange-100 border border-orange-300",
      other:
        "bg-gray-100 text-gray-800 hover:bg-gray-100 border border-gray-300",
    };
    return classes[type] || "bg-blue-100 text-blue-800 hover:bg-blue-100";
  };

  const formatDamageType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const calculateTotalQuantity = (items: ProductDamageItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Damage Information</CardTitle>
          <Badge className={getDamageTypeBadgeClass(productDamage.damage_type)}>
            {formatDamageType(productDamage.damage_type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Damage Number
            </p>
            <p className="text-lg font-semibold mt-1">
              {productDamage.damage_number}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Damage Date
            </p>
            <p className="text-lg font-semibold mt-1">
              {formatDate(productDamage.damage_date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reported Date
            </p>
            <p className="text-lg font-semibold mt-1">
              {formatDate(productDamage.created_at)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Items Affected
            </p>
            <p className="text-lg font-semibold mt-1">
              {productDamage.items.length} items
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Units Lost
            </p>
            <p className="text-lg font-semibold mt-1">
              {calculateTotalQuantity(productDamage.items)} units
            </p>
          </div>
        </div>
        {productDamage.description && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </p>
            <p className="text-sm">{productDamage.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default DamageInformation;
