import { CarTaxiFront, House, MessageSquare, User, Wallet } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Início", icon: House },
  { label: "Viagens", icon: CarTaxiFront },
  { label: "Mensagens", icon: MessageSquare },
  { label: "Carteira", icon: Wallet },
  { label: "Perfil", icon: User },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="flex border-t border-border bg-white px-2 pb-3 pt-2"
    >
      {ITEMS.map((item, i) => {
        const active = i === 0;
        return (
          <button
            key={item.label}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => !active && toast(`${item.label} ainda não está disponível.`)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-1 text-[0.6875rem] font-bold",
              active ? "text-sun-700" : "text-muted-foreground",
            )}
          >
            <item.icon className="size-5" strokeWidth={active ? 2.4 : 2} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
