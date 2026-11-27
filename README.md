# Taxio

Aplicativo de pedido de táxi, feito para telemóvel (também abre no computador dentro de uma moldura de telemóvel).

Construído com [Lovable](https://lovable.dev) · TanStack Start, React 19, Tailwind 4.

## Fluxo de telas

Abertura → boas-vindas → apresentação (3 passos) → entrar / criar conta → perfil → PIN → impressão digital → localização → mapa com táxis por perto → pesquisa de destino → detalhes do local → notificações.
Há ainda a recuperação de palavra-passe (escolha do método → código → nova palavra-passe).

## Estado atual

- Tudo funciona no navegador, sem servidor: o perfil e a localização ficam guardados em `localStorage`.
- O mapa é um desenho estilizado (`src/components/app/map.tsx`), não um mapa real. Os táxis são animados e fictícios.
- Os locais de pesquisa (`src/lib/places.ts`) são pontos de referência de Luanda com coordenadas aproximadas. A distância é em linha reta.
- O PIN, a impressão digital e o código de recuperação não são validados: ainda não há conta nem servidor.
- “Ver direções” abre o Google Maps com o destino.

## Desenvolvimento

```sh
bun install
bun run dev
```

Outros comandos: `bun run build`, `bun run lint`, `bun run test`.
