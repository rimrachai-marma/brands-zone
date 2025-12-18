import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const StatsCard: React.FC<Props> = ({ title, icon, children }) => {
  return (
    <Card className="rounded-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default StatsCard;
