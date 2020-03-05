const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/App');

describe('UserController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('shoud show all users on db', async () => {

            for(let i=0; i < 3; i++){

                await factories.create('User');
            }
    
            const response = await supertest(app).get('/users')
            
            expect(response.status).toBe(200);
            expect(Object.keys(response.body).length).toBe(3);
    });

    it('shoud show a specific user on db', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).get(`/users/${user.id}`);

        expect(response.status).toBe(200);
        expect(user.id).toBe(response.body.id);
    });

    it('shoud return code 400 for user not found - show', async () => {
        
        const response = await supertest(app).get(`/users/22`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud add a user on db', async () => {

        const response = await supertest(app).post('/users').send({
            name: 'teste',
            email: 'teste@teste.com',
            age: 15,
            password: 'bla123'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('teste');
    });

    it('shoud update a user on db', async () => {

        await factories.create('User');

        const response = await supertest(app).put('/users/1').send({
            name: 'test'
        });
        
        expect(response.status).toBe(200);
    });

    it('shoud return code 400 for user not found - update', async () => {

        const response = await supertest(app).put('/users/10').send({
            name: 'test'
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('shoud erase a user from db', async () => {

        await factories.create('User');

        const response = await supertest(app).delete('/users/1');
        
        expect(response.status).toBe(200);
    });

    it('shoud return code 400 for user not found - delete', async () => {

        const response = await supertest(app).delete('/users/1');
        
        expect(response.status).toBe(400);
    });
});