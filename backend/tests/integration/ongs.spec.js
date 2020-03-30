const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('ONG', () => {
    beforeEach(async () => {
        // remove all interactions from last test
        await connection.migrate.rollback();

        // inicialize all tables
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should create a ONG and return a valid Id', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG de test",
                email: "test@email.com",
                whatsapp: "4700000000",
                city: "Fortaleza",
                uf: "CA"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    // how to test list? Should create a ong and test if the list have 1? 
    it('should return a list of ongs', async () => {
        const response = await request(app)
            .get('/ongs')
            .send();

        expect(response.status).toBe(200);
    });
})