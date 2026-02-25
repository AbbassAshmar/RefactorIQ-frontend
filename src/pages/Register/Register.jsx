import { Link } from "react-router-dom";
import { Button, Input } from "@/components";
import "../auth.css";

export default function Register() {
  return (
    <div className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <p className="auth-brand">RefactorIQ</p>
        <h1 id="register-title" className="auth-title">
          Create your account
        </h1>
        <p className="auth-subtitle">
          Start tracking risky modules and refactor priorities.
        </p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <Input
            id="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
          />
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
            Create Account
          </Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}
