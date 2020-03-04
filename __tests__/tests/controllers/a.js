const supertest = require('supertest');

const truncate = require('../../util/truncate');
const factories = require('../../util/factories');
const app = require('../../../src/App');

describe('UserController Test Suit', () => {
    
    beforeAll( async () => {

        await truncate();
    });

    beforeEach( async () => {

        await truncate();
    });

    it('shoud show all users on db', async () => {

        for(let i=0; i < 3; i++){

            await factories.create('User');
        }

        const users = await supertest(app).get('/users')
        
        expect(users.status).toBe(200);
        expect(Object.keys(users.body).length).toBe(3);
    });

    it('shoud show a specific user on db', async () => {

        const userFactory = await factories.create('User');
        
        const user = await supertest(app).get('/users/1');

        expect(user.status).toBe(200);
        expect(JSON.parse(JSON.stringify(userFactory))).toMatchObject(user.body);
    });

    it('shoud add a user on db', async () => {

        const user = await supertest(app).post('/users').send({
            name: 'teste',
            email: 'teste@teste.com',
            age: 15
        });

        expect(user.status).toBe(200);
        expect(user.body.name).toBe('teste');
    });

    it('shoud update a user on db', async () => {

        await factories.create('User');

        const user = await supertest(app).put('/users/1').send({
            name: 'test'
        });
        
        expect(user.status).toBe(200);
        expect(user.body[1]).toBe(1);
    });

    it('shoud erase a user from db', async () => {

        await factories.create('User');

        const user = await supertest(app).delete('/users/1');
        
        expect(user.status).toBe(200);
    });
});