import { createFileRoute } from "@tanstack/react-router";

import { AuthForm } from "@/components/app/auth-form";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Taxio" }] }),
  component: () => <AuthForm mode="login" />,
});
