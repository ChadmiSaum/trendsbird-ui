import { AuthShell } from "@/components/layout/auth-shell";
import { brand } from "@/config/navigation";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      brand={brand}
      headline={<>Grow your business<br />with Trends Bird</>}
      tagline="Websites, software and digital marketing in one place."
      title="Welcome back"
      subtitle="Sign in to continue"
    >
      <LoginForm />
      <p className="mt-6 text-center text-xs text-muted-foreground">This is a demo screen: any email signs in.</p>
    </AuthShell>
  );
}
