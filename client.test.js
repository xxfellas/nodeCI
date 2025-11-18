// client.test.js

const request = require('supertest');
const app = require('./index');

// Variável para armazenar o ID de um cliente criado durante os testes
let createdClientId;

// Hook: Antes de cada teste, reseta o estado do BD (o array 'clients')
beforeEach(async () => {
    await request(app).delete('/test/reset');
});


describe('Client CRUD API', () => {

    // Teste para o CREATE (POST /clients)
    it('should create a new client', async () => {
        const clientData = {
            name: 'Alice Silva',
            email: 'alice.silva@teste.com'
        };

        const response = await request(app)
            .post('/clients')
            .send(clientData)
            .expect(201); // Espera o status 201 Created

        // Verifica o corpo da resposta
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(clientData.name);
        expect(response.body.email).toBe(clientData.email);

        createdClientId = response.body.id; // Salva o ID para testes futuros
    });


    // Teste para o READ All (GET /clients)
    it('should return a list of clients', async () => {
        // Primeiro, cria um cliente para garantir que a lista não esteja vazia
        await request(app)
            .post('/clients')
            .send({ name: 'Bob Souza', email: 'bob@teste.com' })
            .expect(201);

        const response = await request(app)
            .get('/clients')
            .expect(200); // Espera o status 200 OK

        // Verifica se a resposta é um array e se tem pelo menos um item
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('name', 'Bob Souza');
    });


    // Teste para o READ One (GET /clients/:id)
    it('should return a client by ID', async () => {
        // Cria um cliente para buscar
        const createResponse = await request(app)
            .post('/clients')
            .send({ name: 'Charlie Lima', email: 'charlie@teste.com' })
            .expect(201);
        const id = createResponse.body.id;

        const getResponse = await request(app)
            .get(`/clients/${id}`)
            .expect(200);

        expect(getResponse.body.id).toBe(id);
        expect(getResponse.body.name).toBe('Charlie Lima');
    });


    // Teste para o UPDATE (PUT /clients/:id)
    it('should update a client by ID', async () => {
        // Cria um cliente para atualizar
        const createResponse = await request(app)
            .post('/clients')
            .send({ name: 'David Base', email: 'david@base.com' })
            .expect(201);
        const id = createResponse.body.id;

        const updateData = {
            name: 'David Updated',
            email: 'david@updated.com'
        };

        const response = await request(app)
            .put(`/clients/${id}`)
            .send(updateData)
            .expect(200);

        expect(response.body.name).toBe(updateData.name);
        expect(response.body.email).toBe(updateData.email);
    });

    // Teste para o DELETE (DELETE /clients/:id)
    it('should delete a client by ID', async () => {
        // Cria um cliente para deletar
        const createResponse = await request(app)
            .post('/clients')
            .send({ name: 'Eva Delete', email: 'eva@delete.com' })
            .expect(201);
        const id = createResponse.body.id;

        // Deleta o cliente
        await request(app)
            .delete(`/clients/${id}`)
            .expect(204); // Espera o status 204 No Content

        // Tenta buscar o cliente deletado para confirmar a exclusão
        await request(app)
            .get(`/clients/${id}`)
            .expect(404); // Espera o status 404 Not Found
    });

    // Teste de validação: ID não encontrado
    it('should return 404 for a non-existent ID on GET, PUT, and DELETE', async () => {
        const nonExistentId = 'non-existent-id-123';

        // GET
        await request(app).get(`/clients/${nonExistentId}`).expect(404);

        // PUT
        await request(app)
            .put(`/clients/${nonExistentId}`)
            .send({ name: 'Test', email: 'test@test.com' })
            .expect(404);

        // DELETE
        await request(app).delete(`/clients/${nonExistentId}`).expect(404);
    });

});