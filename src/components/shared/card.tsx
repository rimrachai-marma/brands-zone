import React from "react";
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ children, title, description }) => {
  return (
    <ShadcnCard className="rounded-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </ShadcnCard>
  );
};

export default Card;
