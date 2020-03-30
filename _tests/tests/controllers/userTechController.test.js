const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('userTechController Test Suit', () => {

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

    it('shoud return code 400 for  "user_id must be a number" - index', async () => {
        
        const response = await supertest(app).get(`/users/f/techs`);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("user_id");
    });

    it('shoud return code 400 for "user not found" - index', async () => {
        
        const response = await supertest(app).get(`/users/1/techs`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should link a tech to an user', async () => {

        const user = await factories.create('User');
        const tech = await factories.create('Tech');
        
        const response = await supertest(app).post(`/users/${user.id}/techs/${tech.id}`);
    
        expect(response.status).toBe(200);
    });

    it('shoud return code 400 for "user_id referance must be a number" - store', async () => {
        
        const response = await supertest(app).post(`/users/g/techs/1`);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("user_id");
    });

    it('shoud return code 400 for "tech_id referance must be a number" - store', async () => {
        
        const response = await supertest(app).post(`/users/1/techs/j`);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("tech_id");
    });

    it('shoud return code 400 for "user not found" - store', async () => {
        
        const response = await supertest(app).post(`/users/3/techs/2`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud return code 400 for "user not found" - store', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).post(`/users/${user.id}/techs/2`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should unlink a tech of an user', async () => {

        const user = await factories.create('User');
        
        const tech = await factories.create('Tech');

        await user.addTech(tech);

        const response = await supertest(app).delete(`/users/${user.id}/techs/${tech.id}`);

        expect(response.status).toBe(200);
    });

    it('shoud return code 400 for "user_id referance must be a number" - delete', async () => {
        
        const response = await supertest(app).delete(`/users/i/techs/2`);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("user_id");
    });

    it('shoud return code 400 for "tech_id referance must be a number" - delete', async () => {
        
        const response = await supertest(app).delete(`/users/1/techs/p`);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("tech_id");
    });

    it('shoud return code 400 for "user not found" - delete', async () => {
        
        const response = await supertest(app).delete(`/users/1/techs/2`);

        expect(response.status).toBe(400);
    });

    it('shoud return code 400 for "tech not found" - delete', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).delete(`/users/${user.id}/techs/2`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});