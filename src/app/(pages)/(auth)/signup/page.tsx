"use client";

import React, { useState } from "react";
import { User, Store } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLogo from "@/components/common/Header/MainLogo";
import Link from "next/link";
import CustomerSignupForm from "./_components/customer-form";
import VendorSignupForm from "./_components/brands-form";

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center flex flex-col items-center space-y-1.5">
          <MainLogo />
          <p className="text-gray-500 text-sm">The Marketplace for Sustainable Brands</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Choose your account type and get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-none p-0">
                <TabsTrigger
                  value="customer"
                  className="flex items-center gap-2 rounded-none"
                >
                  <User className="w-4 h-4" />
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  value="brands"
                  className="flex items-center gap-2 rounded-none"
                >
                  <Store className="w-4 h-4" />
                  Brands
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <CustomerSignupForm />
              </TabsContent>

              <TabsContent value="brands" className="space-y-4">
                <VendorSignupForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?&nbsp;
              <Button asChild variant="link" className="p-0 text-blue-600">
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
