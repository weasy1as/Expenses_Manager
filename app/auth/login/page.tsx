import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full gap-6 items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 p-6 md:p-10">
      <Image
        width={850}
        height={850}
        src="/loginImg.jpg"
        alt="Login background"
        className="object-cover"
      />

      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <IconWallet className="w-12 h-12 text-indigo-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to manage your expenses, track your spending, and stay on
            top of your finances.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
