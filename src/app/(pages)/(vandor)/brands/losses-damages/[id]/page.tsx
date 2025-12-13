import { Button } from "@/components/ui/button";

import { ArrowLeft, Printer, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDamage } from "@/lib/actions/inventory";
import DamageInformation from "./_components/DamageInformation";
import DamagedItems from "./_components/DamagedItems";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formaters";

export default async function VendorDamageDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await fetchDamage(id);

  if (!result.data) notFound();

  return (
    <div className="bg-slate-50 min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/brands/losses-damages">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Damages
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {/* <Button variant="default" size="sm" asChild>
              <Link href={`/vendor/loss-damage/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button> */}
          </div>
        </div>

        <DamageInformation productDamage={result.data?.productDamage} />
        <DamagedItems items={result.data?.productDamage.items ?? []} />

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-destructive"></div>
                  <div className="w-0.5 h-full bg-border"></div>
                </div>
                <div className="pb-4">
                  <p className="font-medium">Damage Occurred</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data?.productDamage.damage_date)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Damage Reported</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data?.productDamage.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
