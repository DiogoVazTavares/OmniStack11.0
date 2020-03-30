const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('Incidents', () => {
    beforeEach(async () => {
        // remove all interactions from last test
        await connection.migrate.rollback();

        // inicialize all tables
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should create a incident and return a valid Id', async () => {
        // create ONG
        const ong = await request(app)
            .post('/ongs')
            .send({
                name: "ONG",
                email: "test@email.com",
                whatsapp: "4700000000",
                city: "Fortaleza",
                uf: "CA"
            });

        const ongId = ong.body.id;

        const incident = await request(app)
            .post('/incidents')
            .set({
                authorization: ongId,
            })
            .send({
                title: "Caso 100",
                description: "test",
                value: 124
            });

        expect(incident.status).toBe(200);
        expect(incident.body).toHaveProperty('id');
    });

    it('should create a incident and return a valid Id', async () => {
        // create ONG
        const ong = await request(app)
            .post('/ongs')
            .send({
                name: "ONG",
                email: "test@email.com",
                whatsapp: "4700000000",
                city: "Fortaleza",
                uf: "CA"
            });

        const ongId = ong.body.id;

        const incident = await request(app)
            .post('/incidents')
            .set({
                authorization: ongId,
            })
            .send({
                title: "Caso 100",
                description: "test",
                value: 124
            });

        const incidentId = incident.body.id;

        const deleteIncident = await request(app)
            .delete(`/incidents/${incidentId}`)
            .set({
                authorization: ongId
            })
            .send();

        expect(deleteIncident.status).toBe(204);
    });
})