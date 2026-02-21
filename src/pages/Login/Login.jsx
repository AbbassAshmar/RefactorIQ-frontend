import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Github, Mail, Lock, AlertCircle, Loader2, ShieldCheck, Users } from 'lucide-react';
import { useAdminLogin, useGitHubLogin } from '@/hooks';

function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

/* ─── Tiny sub-components ───────────────────────────────────────── */

function InputField({ id, label, type, value, onChange, placeholder, disabled, icon: Icon, autoComplete }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-small-1 font-medium text-text-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-tertiary">
          <Icon size={15} strokeWidth={1.8} />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          className="
            w-full rounded-lg border border-border-default
            bg-background-primary
            py-2.5 pl-9 pr-3
            text-body text-text-primary
            outline-none
            transition-all duration-150
            placeholder:text-text-tertiary
            focus:border-border-focus focus:ring-2 focus:ring-[var(--brand-primary-bg,theme(colors.brand.primary/10%))]
            disabled:opacity-60
            hover:border-text-tertiary
          "
        />
      </div>
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-error-border bg-error-bg px-3 py-2.5 text-small-1 text-error-text">
      <AlertCircle size={14} className="mt-0.5 shrink-0" strokeWidth={2} />
      <span>{message}</span>
    </div>
  );
}

function SectionLabel({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-secondary border border-border-default text-text-secondary">
        <Icon size={15} strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-body font-semibold text-text-primary leading-tight">{title}</p>
        <p className="mt-0.5 text-small-1 text-text-tertiary">{description}</p>
      </div>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border-default" />
      <span className="text-small-2 font-semibold uppercase tracking-widest text-text-tertiary">
        or
      </span>
      <div className="h-px flex-1 bg-border-default" />
    </div>
  );
}

/* ─── Main Login Page ────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = useAdminLogin({
    onSuccess: () => navigate('/home'),
  });

  const githubLogin = useGitHubLogin();

  const isLoading = adminLogin.isPending || githubLogin.isPending;

  const adminError = useMemo(
    () => getErrorMessage(adminLogin.error, 'Login failed. Please check your credentials.'),
    [adminLogin.error],
  );

  const githubError = useMemo(
    () => getErrorMessage(githubLogin.error, 'GitHub sign-in could not start. Please try again.'),
    [githubLogin.error],
  );

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    adminLogin.mutate({ email: email.trim(), password });
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-12">
      {/* Card */}
      <div
        className="
          w-full max-w-[420px]
          rounded-2xl
          border border-border-default
          bg-surface-default
          shadow-lg
          overflow-hidden
        "
      >
        {/* Card header */}
        <div className="border-b border-border-default bg-surface-secondary px-8 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-text-inverse">
              <LogIn size={17} strokeWidth={2.2} />
            </span>
            <div>
              <h1 className="text-h6 font-bold text-text-primary leading-tight tracking-tight">
                Login
              </h1>
              <p className="text-small-2 text-text-tertiary">
                Sign in to your account
              </p>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="px-8 py-7 space-y-7">

          {/* ── Admin section ── */}
          <section className="space-y-4">
            <SectionLabel
              icon={ShieldCheck}
              title="Admin Portal"
              description="Admins must use their assigned credentials"
            />

            <form onSubmit={handleAdminSubmit} className="space-y-3.5">
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                disabled={isLoading}
                icon={Mail}
                autoComplete="email"
              />

              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                icon={Lock}
                autoComplete="current-password"
              />

              {adminLogin.isError && <ErrorBanner message={adminError} />}

              <button
                type="submit"
                disabled={isLoading}
                className="
                  mt-1 flex w-full items-center justify-center gap-2
                  rounded-lg bg-brand-primary
                  px-4 py-2.5
                  text-body font-semibold text-text-inverse
                  transition-all duration-150
                  hover:bg-brand-hover
                  active:bg-brand-pressed
                  disabled:cursor-not-allowed disabled:opacity-60
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2
                "
              >
                {adminLogin.isPending ? (
                  <>
                    <Loader2 size={15} strokeWidth={2.2} className="animate-spin" />
                    Logging in…
                  </>
                ) : (
                  <>
                    <LogIn size={15} strokeWidth={2.2} />
                    Login as Admin
                  </>
                )}
              </button>
            </form>
          </section>

          <Divider />

          {/* ── Client / GitHub section ── */}
          <section className="space-y-4">
            <SectionLabel
              icon={Users}
              title="Client Access"
              description="Clients authenticate via GitHub — no password needed"
            />

            {githubLogin.isError && <ErrorBanner message={githubError} />}

            <button
              type="button"
              onClick={() => githubLogin.mutate()}
              disabled={isLoading}
              className="
                flex w-full items-center justify-center gap-2.5
                rounded-lg
                border border-border-default
                bg-surface-secondary
                px-4 py-2.5
                text-body font-semibold text-text-primary
                transition-all duration-150
                hover:bg-surface-hover hover:border-text-tertiary
                active:bg-surface-pressed
                disabled:cursor-not-allowed disabled:opacity-60
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2
              "
            >
              {githubLogin.isPending ? (
                <>
                  <Loader2 size={16} strokeWidth={2} className="animate-spin" />
                  Redirecting to GitHub…
                </>
              ) : (
                <>
                  <Github size={16} strokeWidth={1.8} />
                  Continue with GitHub
                </>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}