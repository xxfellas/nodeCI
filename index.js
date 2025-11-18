const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;


app.use(express.json());


let clients = [];


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


app.get('/clients', (req, res) => {
    return res.json(clients);
});


app.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    const client = clients.find(c => c.id === id);

    if (!client) {
        return res.status(404).json({ error: 'Client not found.' });
    }

    return res.json(client);
});


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


app.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = clients.length;

    clients = clients.filter(c => c.id !== id);

    if (clients.length === initialLength) {
        return res.status(404).json({ error: 'Client not found.' });
    }

    return res.status(204).send(); 
});


app.delete('/test/reset', (req, res) => {
    clients = [];
    return res.status(204).send();
});



module.exports = app;


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}