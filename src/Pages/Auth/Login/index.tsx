import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh  h-screen flex-col items-center justify-center p-6 md:px-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
