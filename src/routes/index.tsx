import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Logo } from "@/components/app/art";
import { DotLoader, Screen } from "@/components/app/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taxio — táxis ao seu alcance" },
      {
        name: "description",
        content: "Peça um táxi, acompanhe os motoristas por perto e chegue ao destino.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const id = window.setTimeout(() => navigate({ to: "/boas-vindas" }), 2200);
    return () => window.clearTimeout(id);
  }, [navigate]);

  return (
    <Screen className="items-center justify-center bg-white">
      <Logo size={132} />
      <h1 className="sr-only">Taxio</h1>
      <div className="absolute bottom-24">
        <DotLoader />
      </div>
    </Screen>
  );
}
