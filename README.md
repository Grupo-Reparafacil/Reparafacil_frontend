REPARAFÁCIL — Frontend
Plataforma web que conecta clientes que necessitam de serviços de reparo e manutenção a profissionais técnicos específicos.

O cliente busca por profissional, visualiza o perfil, o orçamento estimado e as avaliações, e entra em contato via WhatsApp. O profissional gerencia seu perfil, serviços e avaliações.

Funcionalidades
Login como tela inicial
Criar conta
Busca de profissionais por nome, serviço, categoria e região
Perfil do profissional com habilidades, orçamento estimado e avaliações
Avaliação de serviço com estrelas e comentário
Dashboard do usuário / Meu Perfil
Catálogo de Serviços (ADM)
Tecnologias
React 18 + Vite
React Router DOM
JavaScript ES6+ / JSX
CSS3
Node.js + NPM
ESLint
Como rodar localmente
npm install
npm run dev

Acesse: http://localhost:5173

Variáveis de ambiente
Crie um arquivo .env na raiz:

VITE_API_URL=http://localhost:3000

Em produção, VITE_API_URL deve apontar para a API no Render.

Build para produção
npm run build

Deploy
Frontend (Vercel): https://reparafacilfrontend.vercel.app
Backend (Render): COLAR A URL DO RENDER AQUI
Backend - repositório: https://github.com/Grupo-Reparafacil/Reparafacil_backend
Estrutura
src/
pages - telas (Login, Criar Conta, Busca, Perfil, Avaliação)
components - componentes reutilizáveis
services - chamadas para a API

Projeto
Projeto Integrador II — REPARAFÁCIL
