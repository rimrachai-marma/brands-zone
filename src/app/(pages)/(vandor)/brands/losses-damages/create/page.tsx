import { AlertCircle } from "lucide-react";
import LossDamageForm from "./_components/LossDamageForm";

const page: React.FC = () => {
  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Record Loss & Damage
          </h1>
          <p className="text-slate-500 mt-1">
            Document damaged or lost inventory items
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800">Important</h3>
              <p className="text-sm text-yellow-700">
                Recording loss or damage will reduce inventory levels and affect
                your financial reports. Please ensure all information is
                accurate.
              </p>
            </div>
          </div>

          <LossDamageForm />
        </div>
      </div>
    </div>
  );
};

export default page;
