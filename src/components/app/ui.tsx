import { Link, useRouter } from "@tanstack/react-router";
import {
  Apple,
  ArrowLeft,
  Check,
  Delete,
  Eye,
  EyeOff,
  Facebook,
  type LucideIcon,
} from "lucide-react";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ---------- Estrutura ---------- */

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative flex min-h-full flex-col", className)}>{children}</div>;
}

export function BackBar({ title, right }: { title?: string; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-5 pt-3">
      <button
        type="button"
        aria-label="Voltar"
        onClick={() => router.history.back()}
        className="-ml-1 grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-field focus-visible:outline-2 focus-visible:outline-sun"
      >
        <ArrowLeft className="size-5" />
      </button>
      {title && <h1 className="text-lg font-bold text-ink">{title}</h1>}
      {right && <div className="ml-auto">{right}</div>}
    </header>
  );
}

/* ---------- Botões ---------- */

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "sun" | "soft" | "ghost" };

export function Btn({ tone = "sun", className, ...props }: BtnProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "h-12 w-full rounded-full text-[0.9375rem] font-bold transition-[transform,background-color,opacity] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-45",
        tone === "sun" &&
          "bg-sun text-ink shadow-[0_6px_14px_-8px_var(--sun-700)] hover:brightness-95",
        tone === "soft" && "bg-sun-100 text-sun-700 hover:bg-sun-200",
        tone === "ghost" && "bg-field text-ink hover:bg-sun-100",
        className,
      )}
    />
  );
}

export function LinkBtn({
  to,
  tone = "sun",
  children,
}: {
  to: string;
  tone?: "sun" | "soft" | "ghost";
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "grid h-12 w-full place-items-center rounded-full text-[0.9375rem] font-bold transition-transform active:scale-[0.98]",
        tone === "sun" && "bg-sun text-ink",
        tone === "soft" && "bg-sun-100 text-sun-700",
        tone === "ghost" && "bg-field text-ink",
      )}
    >
      {children}
    </Link>
  );
}

/* ---------- Campos ---------- */

type FieldProps = {
  icon?: LucideIcon | undefined;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label?: string | undefined;
  error?: string | undefined;
  autoComplete?: string | undefined;
  inputMode?: "text" | "email" | "numeric" | "tel" | undefined;
  trailing?: ReactNode;
};

export function Field({
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  autoComplete,
  inputMode,
  trailing,
}: FieldProps) {
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  const id = `f-${placeholder.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex h-[3.25rem] items-center gap-3 rounded-2xl border bg-field px-4 transition-colors focus-within:border-sun focus-within:bg-sun-50",
          error ? "border-destructive" : "border-transparent",
        )}
      >
        {Icon && <Icon className="size-[1.125rem] shrink-0 text-muted-foreground" />}
        <input
          id={id}
          aria-label={label ?? placeholder}
          aria-invalid={!!error}
          type={isPassword && shown ? "text" : type}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted-foreground"
        />
        {isPassword && (
          <button
            type="button"
            aria-label={shown ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
            onClick={() => setShown((s) => !s)}
            className="text-muted-foreground"
          >
            {shown ? <EyeOff className="size-[1.125rem]" /> : <Eye className="size-[1.125rem]" />}
          </button>
        )}
        {trailing}
      </label>
      {error && <p className="mt-1.5 px-1 text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}

export function Remember({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="mx-auto flex items-center gap-2.5 text-sm font-semibold text-ink"
    >
      <span
        className={cn(
          "grid size-5 place-items-center rounded-md border-2 transition-colors",
          checked ? "border-sun bg-sun" : "border-sun",
        )}
      >
        {checked && <Check className="size-3.5 text-ink" strokeWidth={3.5} />}
      </span>
      Lembrar-me
    </button>
  );
}

/* ---------- Início de sessão social ---------- */

export function SocialRow({
  onPick,
  compact = false,
}: {
  onPick: (name: string) => void;
  compact?: boolean;
}) {
  const items = [
    { name: "Facebook", node: <Facebook className="size-5 text-[#1877F2]" /> },
    { name: "Google", node: <span className="text-lg font-black text-[#EA4335]">G</span> },
    { name: "Apple", node: <Apple className="size-5 text-ink" /> },
  ];
  return (
    <div className={cn("flex justify-center gap-3", compact && "gap-4")}>
      {items.map((s) => (
        <button
          key={s.name}
          type="button"
          aria-label={`Continuar com ${s.name}`}
          onClick={() => onPick(s.name)}
          className="grid h-14 w-[5.25rem] place-items-center rounded-2xl border border-border bg-white transition-colors hover:bg-sun-50"
        >
          {s.node}
        </button>
      ))}
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {children}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ---------- Teclado numérico e códigos ---------- */

export function Keypad({
  onDigit,
  onDelete,
}: {
  onDigit: (d: string) => void;
  onDelete: () => void;
}) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];
  return (
    <div className="grid grid-cols-3 gap-y-1 px-8 pb-6">
      {keys.map((k, i) =>
        k === "" ? (
          <span key={`gap-${i}`} />
        ) : (
          <button
            key={k}
            type="button"
            aria-label={k === "del" ? "Apagar" : k}
            onClick={() => (k === "del" ? onDelete() : onDigit(k))}
            className="grid h-14 place-items-center rounded-xl text-2xl font-bold text-ink transition-colors active:bg-sun-100"
          >
            {k === "del" ? <Delete className="size-6 text-muted-foreground" /> : k}
          </button>
        ),
      )}
    </div>
  );
}

export function CodeBoxes({
  value,
  length = 4,
  mask = false,
}: {
  value: string;
  length?: number;
  mask?: boolean;
}) {
  return (
    <div className="flex justify-center gap-3" role="group" aria-label="Código">
      {Array.from({ length }).map((_, i) => {
        const filled = i < value.length;
        const active = i === value.length;
        return (
          <span
            key={i}
            className={cn(
              "grid h-16 w-[4.25rem] place-items-center rounded-2xl border-2 bg-field text-2xl font-extrabold text-ink transition-colors",
              active ? "border-sun bg-sun-50" : "border-transparent",
            )}
          >
            {filled ? mask ? <span className="size-3 rounded-full bg-ink" /> : value[i] : ""}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Diálogos ---------- */

export function DotLoader() {
  return (
    <span className="dot-loader flex gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2.5 rounded-full bg-sun"
          style={{ animation: `dot-orbit 1.1s ease-in-out ${i * 0.18}s infinite` }}
        />
      ))}
    </span>
  );
}

export function Sheet({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="absolute inset-0 z-30 grid place-items-center bg-ink/55 px-8"
    >
      <div
        className="w-full rounded-[1.75rem] bg-white p-7 text-center shadow-xl"
        style={{ animation: "pop-in .22s ease-out" }}
      >
        {children}
      </div>
    </div>
  );
}

export function SuccessSheet({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Sheet label={title}>
      <div className="mx-auto grid size-24 place-items-center rounded-full bg-sun-100">
        <div className="grid size-16 place-items-center rounded-full bg-sun">
          <Icon className="size-8 text-ink" strokeWidth={2.2} />
        </div>
      </div>
      <h2 className="mt-5 text-xl font-extrabold text-sun-700">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-6 flex justify-center">
        <DotLoader />
      </div>
    </Sheet>
  );
}
