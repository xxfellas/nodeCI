// client.test.js

const request = require('supertest');
const app = require('./index');


let createdClientId;


beforeEach(async () => {
    await request(app).delete('/test/reset');
});


describe('Client CRUD API', () => {


    it('should create a new client', async () => {
        const clientData = {
            name: 'Alice Silva',
            email: 'alice.silva@teste.com'
        };

        const response = await request(app)
            .post('/clients')
            .send(clientData)
            .expect(201); 


        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(clientData.name);
        expect(response.body.email).toBe(clientData.email);

        createdClientId = response.body.id; 
    });



    it('should return a list of clients', async () => {

        await request(app)
            .post('/clients')
            .send({ name: 'Bob Souza', email: 'bob@teste.com' })
            .expect(201);

        const response = await request(app)
            .get('/clients')
            .expect(200); 

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('name', 'Bob Souza');
    });



    it('should return a client by ID', async () => {

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



    it('should update a client by ID', async () => {

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

  
    it('should delete a client by ID', async () => {
        const createResponse = await request(app)
            .post('/clients')
            .send({ name: 'Eva Delete', email: 'eva@delete.com' })
            .expect(201);
        const id = createResponse.body.id;

        await request(app)
            .delete(`/clients/${id}`)
            .expect(204);
        await request(app)
            .get(`/clients/${id}`)
            .expect(404);
    });


    it('should return 404 for a non-existent ID on GET, PUT, and DELETE', async () => {
        const nonExistentId = 'non-existent-id-123';


        await request(app).get(`/clients/${nonExistentId}`).expect(404);

        await request(app)
            .put(`/clients/${nonExistentId}`)
            .send({ name: 'Test', email: 'test@test.com' })
            .expect(404);

        await request(app).delete(`/clients/${nonExistentId}`).expect(404);
    });

});