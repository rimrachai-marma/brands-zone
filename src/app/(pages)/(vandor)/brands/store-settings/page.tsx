"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/vendor/vendor-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function StoreSettingsPage() {
  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Store Settings</h1>
          <p className="text-slate-500 mt-1">Manage your store information</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  defaultValue="My Store"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="store-email">Store Email</Label>
                <Input
                  id="store-email"
                  type="email"
                  defaultValue="vendor@mystore.com"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="store-description">Store Description</Label>
              <Textarea
                id="store-description"
                defaultValue="We offer high-quality electronics and accessories for tech enthusiasts."
                className="mt-2"
                rows={4}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  defaultValue="https://mystore.com"
                  className="mt-2"
                />
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Store Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                defaultValue="123 Main Street"
                className="mt-2"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="New York" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" defaultValue="NY" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input id="zip" defaultValue="10001" className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                defaultValue="United States"
                className="mt-2"
              />
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Address
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
