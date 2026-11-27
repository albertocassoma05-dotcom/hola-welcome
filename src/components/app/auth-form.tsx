import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

import { isEmail, useProfile } from "@/lib/session";
import { BackBar, Divider, Field, Remember, Screen, SocialRow } from "./ui";

export function AuthForm({ mode }: { mode: "cadastro" | "login" }) {
  const navigate = useNavigate();
  const { save } = useProfile();
  const isSignup = mode === "cadastro";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function submit() {
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Escreva um email válido, por exemplo nome@dominio.com.";
    if (password.length < 8) next.password = "A palavra-passe precisa de pelo menos 8 caracteres.";
    setErrors(next);
    if (next.email || next.password) return;
    save({ email: email.trim() });
    navigate({ to: isSignup ? "/perfil" : "/localizacao" });
  }

  function social() {
    navigate({ to: isSignup ? "/perfil" : "/localizacao" });
  }

  return (
    <Screen>
      <BackBar />
      <form
        className="flex flex-1 flex-col px-6 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        <h1 className="mt-4 mb-8 text-[2rem] font-extrabold leading-[1.1] text-ink">
          {isSignup ? "Crie a sua conta" : "Entre na sua conta"}
        </h1>

        <div className="space-y-4">
          <Field
            icon={Mail}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            error={errors.email}
          />
          <Field
            icon={Lock}
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            placeholder="Palavra-passe"
            value={password}
            onChange={setPassword}
            error={errors.password}
          />
        </div>

        <div className="mt-6">
          <Remember checked={remember} onChange={setRemember} />
        </div>

        <button
          type="submit"
          className="mt-6 h-12 w-full rounded-full bg-sun text-[0.9375rem] font-bold text-ink shadow-[0_6px_14px_-8px_var(--sun-700)] transition-transform active:scale-[0.98]"
        >
          {isSignup ? "Criar conta" : "Entrar"}
        </button>

        {!isSignup && (
          <Link to="/recuperar" className="mt-5 text-center text-sm font-bold text-sun-700">
            Esqueceu a palavra-passe?
          </Link>
        )}

        <div className="mt-7">
          <Divider>ou continue com</Divider>
        </div>
        <div className="mt-5">
          <SocialRow onPick={social} />
        </div>

        <p className="mt-auto pt-8 text-center text-sm font-medium text-muted-foreground">
          {isSignup ? "Já tem conta? " : "Ainda não tem conta? "}
          <Link to={isSignup ? "/login" : "/cadastro"} className="font-bold text-sun-700">
            {isSignup ? "Entrar" : "Criar conta"}
          </Link>
        </p>
      </form>
    </Screen>
  );
}
