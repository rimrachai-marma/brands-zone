export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import MainLogo from "@/components/common/Header/MainLogo";
import Link from "next/link";
import LoginForm from "./_components/form";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center flex flex-col items-center space-y-1.5">
          <MainLogo />
          <p className="text-gray-500 text-sm">Your trusted marketplace</p>
        </div>

        <Card className="shadow-lg rounded-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?&nbsp;
              <Button asChild variant="link" className="p-0 text-blue-600">
                <Link href="/signup" className="font-semibold">
                  Sign up
                </Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
