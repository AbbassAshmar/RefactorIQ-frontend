export default function Login() {
  return (
    <div className="min-h-screen grid place-items-center p-5 bg-background-secondary">
      <section
        className="w-full max-w-[430px] rounded-[14px] border border-border-default bg-surface-default p-[1.2rem] shadow-sm"
        aria-labelledby="login-title"
      >
        <p className="text-[0.85rem] font-bold tracking-[0.02em] text-text-brand">
          RefactorIQ
        </p>
        <h1
          id="login-title"
          className="mt-[0.4rem] text-[1.35rem] leading-[1.2] text-text-primary"
        >
          Login
        </h1>
        <p className="mt-[0.35rem] text-[0.88rem] text-text-secondary">
          Access your refactor insights and recent scans.
        </p>

        <form
          className="mt-4 flex flex-col gap-[0.85rem]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[0.84rem] text-text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-border-default bg-surface-default px-3 py-2 text-[0.9rem] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-brand"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-[0.84rem] text-text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-border-default bg-surface-default px-3 py-2 text-[0.9rem] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-brand"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-brand-primary px-4 py-2 text-[0.9rem] font-semibold text-text-inverse transition-colors hover:bg-brand-primary-hover"
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
}
