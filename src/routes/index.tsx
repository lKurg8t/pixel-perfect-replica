import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LogIn, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In · NewTech Collections & Recovery System" },
      {
        name: "description",
        content:
          "Interactive wireframe for the NewTech Collections & Recovery System — sign in to explore the full debt collection and recovery lifecycle prototype.",
      },
      { property: "og:title", content: "NewTech Collections & Recovery System" },
      {
        property: "og:description",
        content:
          "Enterprise collections and recovery platform prototype: dashboards, agent workspace, queues, litigation and recovery lifecycle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [show, setShow] = useState(false);

  return (
    <div className="gradient-brand relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-primary-foreground/10" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 size-[520px] rounded-full bg-primary-foreground/10" />

      <div className="surface-panel relative w-full max-w-[520px] px-8 py-10 shadow-[var(--shadow-float)] sm:px-12">
        <div className="flex items-center justify-center gap-3">
          <span className="gradient-brand grid size-11 place-items-center rounded-xl text-primary-foreground">
            <ShieldCheck className="size-6" />
          </span>
          <span className="text-3xl font-extrabold tracking-tight text-gradient-brand">NewTech CRS</span>
        </div>
        <h1 className="mt-5 text-center text-xl font-bold text-primary">
          Collections &amp; Recovery System
        </h1>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          Interactive stakeholder wireframe — demonstration data only
        </p>

        <button
          type="button"
          className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-input bg-card text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <span className="text-base font-bold text-brand-blue">G</span> Sign in with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> Or continue with email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
        >
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Email Address *</span>
            <div className="mt-1 flex h-12 items-center gap-3 rounded-full border border-input bg-card px-4 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25">
              <Mail className="size-5 text-brand-blue" />
              <input
                type="email"
                defaultValue="lee.kurgat@newtechgx.co.ke"
                className="h-full w-full bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground">Password *</span>
            <div className="mt-1 flex h-12 items-center gap-3 rounded-full border border-input bg-card px-4 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25">
              <Lock className="size-5 text-brand-blue" />
              <input
                type={show ? "text" : "password"}
                defaultValue="demo-password"
                className="h-full w-full bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                onClick={() => setShow((s) => !s)}
                className="text-brand-blue"
              >
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </label>

          <div className="text-right">
            <button type="button" className="text-sm font-semibold text-primary hover:underline">
              Reset password?
            </button>
          </div>

          <Button
            type="submit"
            className="gradient-brand h-13 w-full rounded-full text-base font-bold shadow-[var(--shadow-float)]"
            size="lg"
            asChild
          >
            <Link to="/dashboard">
              <LogIn className="size-5" /> Sign In
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
