"use client";

import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Briefcase, Landmark, Shield, Store, UserIcon } from "lucide-react";
import PersonalInformation from "./PersonalInformation";
import ShopInformation from "./ShopInformation";
import BusinessInformation from "./BusinessInformation";
import BankingInformation from "./BankingInformation";
import SecurityInformation from "./SecurityInformation";
import { Vendor } from "@/types/vendor";
import { User } from "@/types";

interface Props {
  vendor: Vendor;
  user: User;
}

const Tabs: React.FC<Props> = ({ vendor, user }) => {
  return (
    <ShadcnTabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="personal">
          <UserIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Personal</span>
        </TabsTrigger>
        <TabsTrigger value="shop">
          <Store className="w-4 h-4" />
          <span className="hidden sm:inline">Shop Info</span>
        </TabsTrigger>
        <TabsTrigger value="business">
          <Briefcase className="w-4 h-4" />
          <span className="hidden sm:inline">Business</span>
        </TabsTrigger>
        <TabsTrigger value="banking">
          <Landmark className="w-4 h-4" />
          <span className="hidden sm:inline">Banking</span>
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInformation user={user} vendor={vendor} />
      </TabsContent>

      <TabsContent value="shop">
        <ShopInformation vendor={vendor} />
      </TabsContent>

      <TabsContent value="business">
        <BusinessInformation vendor={vendor} />
      </TabsContent>

      <TabsContent value="banking">
        <BankingInformation vendor={vendor} />
      </TabsContent>

      <TabsContent value="security">
        <SecurityInformation />
      </TabsContent>
    </ShadcnTabs>
  );
};

export default Tabs;
