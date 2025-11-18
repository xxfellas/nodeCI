📄 README.md - Cadastro de Clientes (CRUD Node.js)
Olá! Este é um projeto simples de CRUD (Create, Read, Update, Delete) de clientes feito em Node.js usando Express.

Ele tem testes unitários com Jest e Supertest e está configurado para Integração Contínua (CI/CD) com Docker e GitHub Actions.

____________________________________________________________________________________________________

🚀 Como Rodar (Localmente)
Você vai precisar ter o Node.js e o npm instalados.

1. Clonar o Projeto:

git clone [Link do seu repositório]
cd [nome da pasta do projeto]

2. Instalar as Dependências:

npm install

3. Iniciar o Servidor:

npm start

O servidor estará rodando em http://localhost:3000.

____________________________________________________________________________________________________

✅ Como Rodar os Testes
Para verificar se todas as funções (Criar, Ler, Atualizar, Deletar) estão funcionando:

npm test

Se tudo der certo, o Jest vai mostrar que todos os testes passaram.

____________________________________________________________________________________________________

⚙️ Tecnologias Usadas
Node.js e Express: Para criar o servidor e as rotas da API.

Jest e Supertest: Para fazer os testes.

uuid: Para gerar IDs únicos para os clientes.

Dockerfile e GitHub Actions: Para automatizar o build (construção) e o deploy (publicação).

____________________________________________________________________________________________________

🛣️ Rotas da API

Método,Rota,Descrição
POST,/clients,Cria um novo cliente.
GET,/clients,Lista todos os clientes.
GET,/clients/:id,Pega um cliente específico.
PUT,/clients/:id,Atualiza um cliente específico.
DELETE,/clients/:id,Deleta um cliente específico.
















































































































