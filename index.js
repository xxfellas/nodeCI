// index.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware para processar JSON nas requisições
app.use(express.json());

// Armazenamento de dados em memória (simulando um BD)
let clients = [];

/**
 * Rotas do CRUD
 */

// 1. CREATE (Cria um novo cliente)
app.post('/clients', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newClient = {
        id: uuidv4(),
        name,
        email
    };

    clients.push(newClient);
    return res.status(201).json(newClient);
});

// 2. READ All (Retorna todos os clientes)
app.get('/clients', (req, res) => {
    return res.json(clients);
});

// 3. READ One (Retorna um cliente pelo ID)
app.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    const client = clients.find(c => c.id === id);

    if (!client) {
        return res.status(404).json({ error: 'Client not found.' });
    }

    return res.json(client);
});

// 4. UPDATE (Atualiza um cliente pelo ID)
app.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const clientIndex = clients.findIndex(c => c.id === id);

    if (clientIndex < 0) {
        return res.status(404).json({ error: 'Client not found.' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required for update.' });
    }

    const updatedClient = {
        id,
        name,
        email
    };

    clients[clientIndex] = updatedClient;
    return res.json(updatedClient);
});

// 5. DELETE (Deleta um cliente pelo ID)
app.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = clients.length;

    clients = clients.filter(c => c.id !== id);

    if (clients.length === initialLength) {
        return res.status(404).json({ error: 'Client not found.' });
    }

    return res.status(204).send(); // Resposta 204 No Content para sucesso sem corpo
});

// Função para resetar os dados para os testes
app.delete('/test/reset', (req, res) => {
    clients = [];
    return res.status(204).send();
});


// Exporta o app para que o supertest possa usá-lo
module.exports = app;

// Inicia o servidor se o arquivo for executado diretamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}