const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('userTechController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all techs', async () => {

        const response = await supertest(app).get('/techs');

        expect(response.status).toBe(200);
    });

    it('should show a tech', async () => {

        const tech = await factories.create('Tech');

        const response = await supertest(app).get(`/techs/${tech.id}`);

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "tech not found"', async () => {

        const response = await supertest(app).get(`/techs/1`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should create a new tech', async () => {

        const response = await supertest(app).post(`/techs`).send({
            name: 'test'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
    });

    it('should update a tech', async () => {

        const tech = await factories.create('Tech');

        const response = await supertest(app).put(`/techs/${tech.id}`).send({
            name: 'test'
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "tech not found" - update', async () => {

        const response = await supertest(app).put(`/techs/6`).send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should delete a tech', async () => {

        const tech = await factories.create('Tech');

        const response = await supertest(app).delete(`/techs/${tech.id}`);

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "tech not found" - delete', async () => {

        const response = await supertest(app).delete(`/techs/6`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});