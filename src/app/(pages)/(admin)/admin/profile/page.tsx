"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  Upload,
  User,
  Mail,
  Phone,
  Shield,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock user data based on schema
  const [userData, setUserData] = useState({
    id: "019a6209-a739-7045-83a0-745481fe04a3",
    name: "Admin User",
    email: "admin@platform.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    role: "admin",
    email_verified_at: "2024-01-15T10:30:00.000Z",
    phone_verified_at: "2024-01-15T10:30:00.000Z",
    newsletter_subscribed: true,
    sms_notifications: true,
    created_at: "2024-01-10T08:00:00.000Z",
  });

  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {

  };

  const handleChangePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {userData.name}
                  </h2>
                  <Badge variant="default" className="bg-blue-600">
                    <Shield className="h-3 w-3 mr-1" />
                    Administrator
                  </Badge>
                </div>
                <p className="text-slate-600 mt-1">{userData.email}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Member since {formatDate(userData.created_at)}
                </p>
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Change Avatar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                      {userData.email_verified_at ? (
                        <Badge variant="default" className="shrink-0">
                          Verified
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      value={userData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                    {userData.phone_verified_at ? (
                      <Badge variant="default" className="shrink-0">
                        Verified
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm">
                        Verify
                      </Button>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-slate-600">User ID</Label>
                    <p className="text-sm font-mono text-slate-900 mt-1">
                      {userData.id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Role</Label>
                    <p className="text-sm text-slate-900 mt-1 capitalize">
                      {userData.role}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Account Created</Label>
                    <p className="text-sm text-slate-900 mt-1">
                      {formatDate(userData.created_at)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Email Verified</Label>
                    <p className="text-sm text-slate-900 mt-1">
                      {userData.email_verified_at
                        ? formatDate(userData.email_verified_at)
                        : "Not verified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password *</Label>
                  <div className="relative">
                    <Input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current_password}
                      onChange={(e) =>
                        handlePasswordChange("current_password", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password *</Label>
                  <div className="relative">
                    <Input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new_password}
                      onChange={(e) =>
                        handlePasswordChange("new_password", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">
                    Confirm New Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm_password}
                      onChange={(e) =>
                        handlePasswordChange("confirm_password", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleChangePassword}>
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Enable 2FA</p>
                    <p className="text-sm text-slate-500">
                      Secure your account with two-factor authentication
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-slate-500">
                      Receive email updates about your account activity
                    </p>
                  </div>
                  <Switch
                    checked={userData.newsletter_subscribed}
                    onCheckedChange={(checked) =>
                      handleInputChange("newsletter_subscribed", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-slate-500">
                      Receive text messages for important updates
                    </p>
                  </div>
                  <Switch
                    checked={userData.sms_notifications}
                    onCheckedChange={(checked) =>
                      handleInputChange("sms_notifications", checked)
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>
                  Choose what emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Product updates and announcements</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Tips and tutorials</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Platform updates</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Security alerts</Label>
                  <Switch defaultChecked disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
