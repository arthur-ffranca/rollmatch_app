# RollMatch

MVP de um web app para encontrar parceiros de treino de Jiu-Jitsu por região, faixa, peso e modalidade.

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois abra:

```text
http://localhost:3000
```

## Estrutura principal

```text
app/page.tsx       # Interface principal
app/layout.tsx     # Layout base do Next.js
app/globals.css    # CSS/Tailwind
data/athletes.ts   # Base fake de atletas
```

## Próximos passos

- Criar formulário de cadastro de atleta
- Salvar dados no Neon/PostgreSQL
- Criar score de compatibilidade
- Fazer deploy na Vercel
