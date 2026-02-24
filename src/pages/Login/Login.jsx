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
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-small-1 font-medium text-text-secondary ml-0.5"
            >
                {label}
            </label>
            <div className="relative group">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-tertiary transition-colors group-focus-within:text-brand-primary">
                    <Icon size={16} strokeWidth={2} />
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
                        py-2.5 pl-10 pr-4
                        text-body text-text-primary
                        outline-none
                        transition-all duration-200
                        placeholder:text-text-disabled
                        hover:border-border-secondary
                        focus:border-border-focus focus:ring-4 focus:ring-brand-primary/10
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                />
            </div>
        </div>
    );
}

function ErrorBanner({ message }) {
    return (
        <div className="flex items-start gap-3 rounded-lg border border-error-border bg-error-bg/50 px-4 py-3 text-small-1 text-error-text backdrop-blur-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" strokeWidth={2} />
            <span className="font-medium">{message}</span>
        </div>
    );
}

function SectionLabel({ icon: Icon, title, description }) {
    return (
        <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background-tertiary border border-border-tertiary text-text-secondary shadow-sm">
                <Icon size={18} strokeWidth={2} />
            </span>
            <div className="space-y-0.5">
                <p className="text-body font-bold text-text-primary tracking-tight">{title}</p>
                <p className="text-small-1 text-text-tertiary leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function Divider() {
    return (
        <div className="flex items-center gap-4 py-1">
            <div className="h-px flex-1 bg-border-tertiary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-disabled">
                or
            </span>
            <div className="h-px flex-1 bg-border-tertiary" />
        </div>
    );
}

/* ─── Main Login Page ────────────────────────────────────────────── */

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const adminLogin = useAdminLogin({
        onSuccess: () => navigate('/admin/overview'),
    });

    const githubLogin = useGitHubLogin();

    const isLoading = adminLogin.isPending || githubLogin.isPending;

    const adminError = useMemo(
        () => getErrorMessage(adminLogin.error, 'Login failed. Check your credentials.'),
        [adminLogin.error],
    );

    const githubError = useMemo(
        () => getErrorMessage(githubLogin.error, 'GitHub sign-in failed.'),
        [githubLogin.error],
    );

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        adminLogin.mutate({ email: email.trim(), password });
    };

    return (
        <div className="min-h-screen bg-background-primary flex items-center justify-center px-6 py-12 md:py-16">
            {/* Card Wrapper with Elevation */}
            <div
                className="
                    w-full max-w-[540px]
                    rounded-xl
                    border border-border-default
                    bg-background-secondary
                    shadow-xl
                    overflow-hidden
                    transition-all duration-300
                "
            >
                {/* Subtle Header Highlight */}
                <div className="border-b border-border-tertiary bg-background-tertiary/30 px-8 py-7">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary shadow-lg shadow-brand-primary/20 text-text-primary">
                            <LogIn size={22} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-h5 font-extrabold text-text-primary tracking-tight">
                                Login
                            </h1>
                            <p className="text-small-1 text-text-tertiary font-medium">
                                Sign in to manage your workspace
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card body */}
                <div className="px-8 py-8 space-y-10">

                    {/* ── Admin section ── */}
                    <section className="space-y-5">
                        <SectionLabel
                            icon={ShieldCheck}
                            title="Admin Portal"
                            description="Access for verified staff members only"
                        />

                        <form onSubmit={handleAdminSubmit} className="space-y-5">
                            <div className="space-y-3">
                                <InputField
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
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
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    icon={Lock}
                                    autoComplete="current-password"
                                />
                            </div>

                            {adminLogin.isError && <ErrorBanner message={adminError} />}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="
                                    relative mt-2 flex w-full items-center justify-center gap-2
                                    rounded-lg bg-brand-primary
                                    px-4 py-3
                                    text-body font-bold text-text-primary
                                    shadow-md shadow-brand-primary/10
                                    transition-all duration-200
                                    hover:bg-brand-hover hover:-translate-y-0.5
                                    active:bg-brand-pressed active:translate-y-0
                                    disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-y-0
                                    focus:outline-none focus:ring-4 focus:ring-brand-primary/20
                                "
                            >
                                {adminLogin.isPending ? (
                                    <>
                                        <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={18} strokeWidth={2.5} />
                                        Login as Admin
                                    </>
                                )}
                            </button>
                        </form>
                    </section>

                    <Divider />

                    {/* ── Client / GitHub section ── */}
                    <section className="space-y-5">
                        <SectionLabel
                            icon={Users}
                            title="Client Access"
                            description="Fast, secure access via your GitHub account"
                        />

                        {githubLogin.isError && <ErrorBanner message={githubError} />}

                        <button
                            type="button"
                            onClick={() => githubLogin.mutate()}
                            disabled={isLoading}
                            className="
                                group relative flex w-full items-center justify-center gap-3
                                rounded-lg
                                border border-border-secondary
                                bg-background-tertiary
                                px-4 py-3
                                text-body font-bold text-text-primary
                                shadow-sm
                                transition-all duration-200
                                hover:bg-background-hover hover:border-text-tertiary
                                active:bg-background-pressed
                                disabled:cursor-not-allowed disabled:opacity-50
                                focus:outline-none focus:ring-4 focus:ring-border-focus/10
                            "
                        >
                            {githubLogin.isPending ? (
                                <>
                                    <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
                                    Connecting to GitHub...
                                </>
                            ) : (
                                <>
                                    <Github size={18} strokeWidth={2} className="transition-transform group-hover:scale-110" />
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