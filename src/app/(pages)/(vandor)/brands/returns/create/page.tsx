import ProductReturnForm from "./_components/form";

const ProductReturn: React.FC = () => {
  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Create Product Return
          </h1>
          <p className="text-slate-500 mt-1">
            Record returned products to suppliers
          </p>
        </div>

        <ProductReturnForm />
      </div>
    </div>
  );
};

export default ProductReturn;
