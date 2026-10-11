# Catálogo de Produtos

API REST desenvolvida com Node.js, Express e MySQL para gerenciamento de produtos.

## Funcionalidades

- Listar todos os produtos
- Buscar produto por ID
- Cadastrar produtos
- Atualizar produtos
- Excluir produtos
- Validar dados e IDs
- Impedir nomes duplicados

## Tecnologias

Node.js, Express, MySQL e JavaScript.

## Como executar

1. Clone este repositório.
2. Execute `npm install` no terminal.
3. Importe o arquivo `database.sql` no MySQL Workbench.
4. Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
5. Configure as credenciais do seu MySQL no `.env`.
6. Execute `npm run dev`.

A API estará disponível em `http://localhost:3000`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/:id` | Buscar produto por ID |
| POST | `/produtos` | Cadastrar produto |
| PUT | `/produtos/:id` | Atualizar produto |
| DELETE | `/produtos/:id` | Excluir produto |