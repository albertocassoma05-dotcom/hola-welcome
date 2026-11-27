import { createFileRoute } from "@tanstack/react-router";

import { AuthForm } from "@/components/app/auth-form";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — Taxio" }] }),
  component: () => <AuthForm mode="cadastro" />,
});
