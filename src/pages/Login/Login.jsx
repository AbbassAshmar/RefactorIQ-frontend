import { Link } from "react-router-dom";
import { Button, Input } from "@/components";
import "../auth.css";

export default function Login() {
  return (
    <div className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <p className="auth-brand">RefactorIQ</p>
        <h1 id="login-title" className="auth-title">
          Welcome back
        </h1>
        <p className="auth-subtitle">
          Sign in to continue to your refactor dashboard.
        </p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </div>
  );
}
