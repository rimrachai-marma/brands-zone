import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Download } from "lucide-react";
import Link from "next/link";
import ReturnInformation from "./_components/ReturnInformation";
import ReturnItems from "./_components/ReturnItems";
import { formatDate } from "@/utils/formaters";
import { fetchReturn } from "@/lib/actions/inventory";
import { notFound } from "next/navigation";

export default async function VendorReturnDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await fetchReturn(id);

  if (!result.data) notFound();

  return (
    <div className="bg-slate-50 min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/brands/returns">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Returns
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
              <Link href={`/vendor/returns/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button> */}
          </div>
        </div>

        <ReturnInformation productReturn={result.data?.productReturn} />
        <ReturnItems items={result.data?.productReturn.items || []} />

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-0.5 h-full bg-border"></div>
                </div>
                <div className="pb-4">
                  <p className="font-medium">Return Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data?.productReturn.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Return Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data?.productReturn.return_date)}
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
