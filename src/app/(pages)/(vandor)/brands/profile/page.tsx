import StatusAlert from "./_components/status-alert";
import ProfileOverview from "./_components/profile-overview";
import Tabs from "./_components/tabs";
import { getVendorProfile } from "@/lib/actions/vendor";
import { getUserProfile } from "@/lib/actions/user";
import BannerUpload from "./_components/BannerUpload";
import { clientEnv } from "@/data/env";

export default async function VendorProfilePage() {
  const vendorResult = await getVendorProfile();
  const userResult = await getUserProfile();
console.log(vendorResult);
  if (!vendorResult || !userResult || !vendorResult.data || !userResult.data) {
    return null;
  }
console.log("VendorProfilePage", vendorResult);
  return (
    <main className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div
          className="h-100 flex flex-col justify-end w-full rounded-lg relative group/cover"
          style={{
            backgroundImage: `url(${
              vendorResult.data.vendor.banner || "/images/banner/banner1.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Vendor banner"
        >
          <BannerUpload
            currentBanner={vendorResult.data.vendor.banner}
            uploadEndpoint={`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/upload/cover-image`}
          />

          <ProfileOverview
            user={userResult?.data?.user}
            vendor={vendorResult?.data?.vendor}
            vendorRating={vendorResult.data.rating}
            VendorStats={vendorResult.data.stats}
            statusState={vendorResult.data.status_state}
          />
        </div>

        <StatusAlert
          status={vendorResult?.data?.vendor?.status}
          verified_at={vendorResult?.data?.vendor?.verified_at}
          submitted_at={vendorResult.data.vendor.submitted_at}
          didit_verification_url={
            vendorResult.data.vendor.didit_verification_url
          }
        />

        <Tabs
          vendor={vendorResult?.data?.vendor}
          user={userResult?.data?.user}
        />
      </div>
    </main>
  );
}

// <div className="mb-6">
//             <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
//             <p className="text-slate-500 mt-1">
//               Manage your vendor account and shop settings
//             </p>
//           </div>
