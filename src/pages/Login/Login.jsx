import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Github,
  Loader2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminLogin, useGitHubLogin } from "@/hooks";
import Button from "@/components/common/Button";
import TextField from "@/components/forms/TextField";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-error-border bg-error-bg px-4 py-3 text-small-1 text-error-text">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@refactoriq.com", password: "password123" },
  });

  const adminLogin = useAdminLogin({
    onSuccess: () => navigate("/admin", { replace: true }),
  });

  const githubLogin = useGitHubLogin();
  const isLoading = adminLogin.isPending || githubLogin.isPending;

  const adminError = useMemo(
    () =>
      getErrorMessage(
        adminLogin.error,
        "Login failed. Check your credentials.",
      ),
    [adminLogin.error],
  );
  const githubError = useMemo(
    () => getErrorMessage(githubLogin.error, "GitHub sign-in failed."),
    [githubLogin.error],
  );

  function onSubmit(values) {
    adminLogin.mutate({
      email: values.email.trim(),
      password: values.password,
    });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,100,145,0.16),transparent_38%),linear-gradient(180deg,var(--background-primary),var(--background-secondary))] px-4 py-10 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-3xl border border-border-default bg-background-secondary shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section
          className="flex flex-col justify-between p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary-bg), var(--background-secondary), var(--background-primary))",
          }}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-background-primary px-3 py-1 text-small-1 font-semibold text-text-secondary">
              <ShieldCheck size={14} /> Admin portal
            </div>
            <h1 className="mt-6 text-h2 font-semibold text-text-primary lg:text-[3.4rem]">
              RefactorIQ admin dashboard
            </h1>
            <p className="mt-4 max-w-xl text-body text-text-secondary">
              A production-ready control center for users, products, orders,
              categories, and system settings.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-default bg-background-primary p-5 shadow-sm">
              <p className="text-small-1 text-text-tertiary">
                Unified operations
              </p>
              <p className="mt-2 text-h5 font-semibold text-text-primary">
                Manage the full storefront from one place.
              </p>
            </div>
            <div className="rounded-2xl border border-border-default bg-background-primary p-5 shadow-sm">
              <p className="text-small-1 text-text-tertiary">Secure sessions</p>
              <p className="mt-2 text-h5 font-semibold text-text-primary">
                JWT-backed auth with protected routes.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md space-y-6">
            <div>
              <p className="text-small-1 uppercase tracking-[0.2em] text-text-tertiary">
                Sign in
              </p>
              <h2 className="mt-2 text-h4 font-semibold text-text-primary">
                Admin access
              </h2>
              <p className="mt-2 text-body text-text-secondary">
                Use your admin credentials to continue.
              </p>
            </div>

            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                id="email"
                type="email"
                icon={Mail}
                autoComplete="email"
                error={form.formState.errors.email?.message}
                {...form.register("email")}
              />
              <TextField
                label="Password"
                id="password"
                type="password"
                icon={Lock}
                autoComplete="current-password"
                error={form.formState.errors.password?.message}
                {...form.register("password")}
              />

              {adminLogin.isError ? <ErrorBanner message={adminError} /> : null}

              <Button type="submit" fullWidth disabled={isLoading}>
                {adminLogin.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} /> Sign in as admin
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-3 rounded-2xl border border-border-default bg-background-primary p-5">
              <p className="text-small-1 font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                Alternative
              </p>
              {githubLogin.isError ? (
                <ErrorBanner message={githubError} />
              ) : null}
              <Button
                variant="secondary"
                fullWidth
                onClick={() => githubLogin.mutate()}
                disabled={isLoading}
              >
                <Github size={16} /> Continue with GitHub
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
