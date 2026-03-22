# Mario-Kart-Node

Um jogo de corrida inspirado em Mario Kart em Node.js com TypeScript.

## 🚀 Visão geral

Projeto de exemplo para simular um motor de corrida entre 2 jogadores, com atributos de:
- velocidade (speed)
- manobrabilidade (maneuverability)
- poder (power)
- pontos (points)

O objetivo é chegar ao **limite de pontos** (100 por default) vencendo a corrida.

## 🧩 Estrutura do projeto

- `src/index.ts` - Lógica principal da corrida (rollDice, block, playRaceEngine, etc.)
- `src/player-interface.ts` - Interface `Player`
- `src/players.ts` - Lista de personagens disponíveis
- `src/players-in-race.ts` - Escolha interativa de 2 jogadores via terminal
- `tsconfig.json` - Configuração TypeScript
- `package.json` - Scripts e dependências

## 🛠️ Dependências

- Node.js 18+
- TypeScript 5.x
- @types/node

## 📦 Scripts npm

- `npm install` - instala dependências
- `npm run build` - compila TypeScript para JavaScript (`tsc`)
- `npm run dev` - compila em watch mode (`tsc --watch`)

## ▶️ Como executar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Compile:
   ```bash
   npm run build
   ```
3. Rode:
   ```bash
   node dist/index.js
   ```

> Alternativa (sem build manual):
> ```bash
> npx ts-node src/index.ts
> ```
> (instale `ts-node` se necessário: `npm install --save-dev ts-node`)

## 🏁 Jogabilidade

- Ao rodar, o sistema solicita seleção de 2 personagens
- A cada rodada, é gerado um bloco de pista:
  - RETA (usa `speed`)
  - CURVA (usa `maneuverability`)
  - CONFRONTO (usa `power`)
- Cada jogador rola um dado (1-6) e soma ao atributo correspondente
- Primeiro a atingir `100` pontos vence