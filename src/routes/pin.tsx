import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { BackBar, Btn, CodeBoxes, Keypad, Screen } from "@/components/app/ui";
import { useDigits } from "@/lib/use-digits";

export const Route = createFileRoute("/pin")({
  head: () => ({ meta: [{ title: "Criar PIN — Taxio" }] }),
  component: Pin,
});

function Pin() {
  const navigate = useNavigate();
  const pin = useDigits(4);

  return (
    <Screen>
      <BackBar title="Crie um PIN" />
      <div className="flex flex-1 flex-col">
        <p className="mx-auto mt-12 max-w-[15rem] text-center text-sm font-semibold leading-relaxed text-ink">
          Defina um PIN de 4 dígitos para proteger a sua conta.
        </p>
        <div className="mt-12">
          <CodeBoxes value={pin.value} mask />
        </div>
        <div className="mt-auto px-6 pb-4">
          <Btn disabled={!pin.complete} onClick={() => navigate({ to: "/digital" })}>
            Continuar
          </Btn>
        </div>
        <Keypad onDigit={pin.add} onDelete={pin.remove} />
      </div>
    </Screen>
  );
}
