import { getCampaigns } from "@/lib/actions/campaigns";
import HotSaleTabs from "./HotSaleTabs";

const HotSale = async () => {
  const query: Record<string, string> = {
    ongoing: "1",
    per_page: "3",
  };

  const result = await getCampaigns(query);

  return (
    <section>
      <div className="container-fluid mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-8">
            <HotSaleTabs campaigns={result.data ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSale;
