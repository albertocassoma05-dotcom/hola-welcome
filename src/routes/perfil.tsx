import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Calendar, Camera, ChevronDown, Mail, Phone, User, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BackBar, Field, Screen } from "@/components/app/ui";
import { isEmail, useProfile } from "@/lib/session";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Complete o perfil — Taxio" }] }),
  component: Perfil,
});

function Perfil() {
  const navigate = useNavigate();
  const { profile, save } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    birth: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    setForm((f) => ({
      ...f,
      email: f.email || profile.email,
      name: f.name || profile.name,
      nickname: f.nickname || profile.nickname,
    }));
    setPhoto((p) => p || profile.photo);
  }, [profile]);

  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  function pickPhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  }

  function submit() {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next["name"] = "Escreva o seu nome completo.";
    if (!isEmail(form.email)) next["email"] = "Escreva um email válido.";
    if (form.phone.replace(/\D/g, "").length < 9) next["phone"] = "O número deve ter 9 dígitos.";
    setErrors(next);
    if (Object.keys(next).length) return;
    save({
      name: form.name.trim(),
      nickname: form.nickname.trim(),
      email: form.email.trim(),
      photo,
    });
    navigate({ to: "/pin" });
  }

  return (
    <Screen>
      <BackBar title="Complete o seu perfil" />
      <form
        className="flex flex-1 flex-col px-6 pb-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="my-5 flex justify-center">
          <button
            type="button"
            aria-label="Escolher fotografia de perfil"
            onClick={() => fileRef.current?.click()}
            className="relative size-24 rounded-full bg-field"
          >
            {photo ? (
              <img
                src={photo}
                alt="A sua fotografia"
                className="size-full rounded-full object-cover"
              />
            ) : (
              <UserRound className="mx-auto size-full p-5 text-sun-200" strokeWidth={1.6} />
            )}
            <span className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-lg border-2 border-white bg-sun">
              <Camera className="size-4 text-ink" />
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => pickPhoto(e.target.files?.[0])}
          />
        </div>

        <div className="space-y-3.5">
          <Field
            placeholder="Nome completo"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            error={errors.name}
          />
          <Field
            placeholder="Como quer ser chamado"
            value={form.nickname}
            onChange={set("nickname")}
          />
          <Field
            icon={Calendar}
            type="date"
            placeholder="Data de nascimento"
            value={form.birth}
            onChange={set("birth")}
          />
          <Field
            icon={Mail}
            type="email"
            inputMode="email"
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            error={errors.email}
          />
          <Field
            placeholder="Telemóvel (+244)"
            inputMode="tel"
            autoComplete="tel-national"
            value={form.phone}
            onChange={set("phone")}
            error={errors.phone}
            icon={Phone}
          />
          <label className="flex h-[3.25rem] items-center gap-3 rounded-2xl border border-transparent bg-field px-4 focus-within:border-sun focus-within:bg-sun-50">
            <User className="size-[1.125rem] text-muted-foreground" />
            <select
              aria-label="Género"
              value={form.gender}
              onChange={(e) => set("gender")(e.target.value)}
              className="flex-1 appearance-none bg-transparent text-sm font-semibold text-ink outline-none"
            >
              <option value="">Género</option>
              <option value="f">Feminino</option>
              <option value="m">Masculino</option>
              <option value="o">Prefiro não dizer</option>
            </select>
            <ChevronDown className="size-4 text-muted-foreground" />
          </label>
        </div>

        <div className="mt-auto pt-8">
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-sun text-[0.9375rem] font-bold text-ink shadow-[0_6px_14px_-8px_var(--sun-700)]"
          >
            Continuar
          </button>
        </div>
      </form>
    </Screen>
  );
}
