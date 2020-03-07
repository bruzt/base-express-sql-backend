const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/App');

describe('techController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all techs from an user', async () => {

        const user = await factories.create('User');

        const tech1 = await factories.create('Tech');
        const tech2 = await factories.create('Tech');

        await user.addTech(tech1);
        await user.addTech(tech2);
        
        const response = await supertest(app).get(`/users/${user.id}/techs`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('shoud return code 400 for "id referance must be a number" - index', async () => {
        
        const response = await supertest(app).get(`/users/f/techs`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "user not found" - index', async () => {
        
        const response = await supertest(app).get(`/users/1/techs`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should add a tech to an user', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).post(`/users/${user.id}/techs`).send({
            name: 'test'
        });
    
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
    });

    it('shoud return code 400 for "id referance must be a number" - store', async () => {
        
        const response = await supertest(app).post(`/users/g/techs`).send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "one or more fields are missing" - store', async () => {
        
        const response = await supertest(app).post(`/users/1/techs`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "user not found" - store', async () => {
        
        const response = await supertest(app).post(`/users/3/techs`).send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should update a tech of an user', async () => {

        const user = await factories.create('User');
        
        const tech = await factories.create('Tech');

        await user.addTech(tech);

        const response = await supertest(app).put(`/users/${user.id}/techs/${tech.id}`).send({
            name: 'test'
        });

        expect(response.status).toBe(200);
        expect(response.body).toBe(1);
    });

    it('shoud return code 400 for "id referance must be a number" - update', async () => {
        
        const response = await supertest(app).put(`/users/h/techs/1`).send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "user not found" - update', async () => {
        
        const response = await supertest(app).put(`/users/7/techs/1`).send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should erase a tech of an user', async () => {

        const user = await factories.create('User');
        
        const tech = await factories.create('Tech');

        await user.addTech(tech);

        const response = await supertest(app).delete(`/users/${user.id}/techs/${tech.id}`);

        expect(response.status).toBe(200);
    });

    it('shoud return code 400 for "id referance must be a number" - delete', async () => {
        
        const response = await supertest(app).delete(`/users/i/techs/2`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "user not found" - delete', async () => {
        
        const response = await supertest(app).delete(`/users/1/techs/2`);

        expect(response.status).toBe(400);
    });

});