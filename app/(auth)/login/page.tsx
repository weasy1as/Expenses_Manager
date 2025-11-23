import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="text-black text-center p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-black">
          Manage your expenses smarter and visualize your spending habits.
        </p>
      </div>
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
