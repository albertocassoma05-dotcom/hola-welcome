import { createFileRoute } from "@tanstack/react-router";
import { format, subDays } from "date-fns";
import { pt } from "date-fns/locale";
import { CreditCard, MapPin, Receipt, TicketPercent, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { BackBar, Screen } from "@/components/app/ui";

export const Route = createFileRoute("/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — Taxio" }] }),
  component: Notificacoes,
});

type Item = { icon: LucideIcon; title: string; text: string };

const GROUPS: { daysAgo: number; items: Item[] }[] = [
  {
    daysAgo: 0,
    items: [
      {
        icon: TicketPercent,
        title: "30% de desconto",
        text: "Válido na sua próxima viagem, só hoje.",
      },
      {
        icon: Wallet,
        title: "Carteira recarregada",
        text: "O saldo já está disponível para pagar viagens.",
      },
    ],
  },
  {
    daysAgo: 1,
    items: [
      {
        icon: MapPin,
        title: "Acompanhe o motorista",
        text: "Agora vê o táxi a aproximar-se em tempo real.",
      },
    ],
  },
  {
    daysAgo: 6,
    items: [
      {
        icon: Receipt,
        title: "Pagamento concluído",
        text: "O pagamento da última viagem foi registado.",
      },
      { icon: CreditCard, title: "Cartão associado", text: "O cartão foi adicionado à sua conta." },
    ],
  },
];

function heading(daysAgo: number, now: Date) {
  if (daysAgo === 0) return "Hoje";
  if (daysAgo === 1) return "Ontem";
  return format(subDays(now, daysAgo), "d 'de' MMMM", { locale: pt });
}

function Notificacoes() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  return (
    <Screen>
      <BackBar title="Notificações" />
      <div className="flex-1 px-5 pb-8">
        {GROUPS.map((g) => (
          <section key={g.daysAgo} className="mt-5">
            <h2 className="mb-3 text-sm font-extrabold text-ink">
              {now ? heading(g.daysAgo, now) : " "}
            </h2>
            <ul className="space-y-3">
              {g.items.map((n) => (
                <li key={n.title} className="flex items-center gap-4 rounded-2xl bg-field p-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun-100">
                    <n.icon className="size-5 text-sun-700" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-ink">{n.title}</span>
                    <span className="mt-0.5 block text-xs font-medium leading-relaxed text-muted-foreground">
                      {n.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Screen>
  );
}
