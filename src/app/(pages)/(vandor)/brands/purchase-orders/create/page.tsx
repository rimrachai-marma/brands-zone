import PurchaseOrderForm from "./_components/PurchaseOrderForm";

export default async function CreatePurchaseOrderPage() {
  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Create Purchase Order
          </h1>
          <p className="text-slate-500 mt-1">
            Order inventory from your suppliers
          </p>
        </div>

        <PurchaseOrderForm />
      </div>
    </div>
  );
}
