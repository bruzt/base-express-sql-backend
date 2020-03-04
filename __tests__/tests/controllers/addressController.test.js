const supertest = require('supertest');

const truncate = require('../../util/truncate');
const factories = require('../../util/factories');
const app = require('../../../src/App');

describe('AddressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('shoud show all address of a user', async () => {

        const user = await factories.create('User');
        
        await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).get(`/users/${user.id}/addresses`)
        
        expect(response.status).toBe(200);
        expect(response.body[0].user_id).toBe(user.id);
    });

    it('shoud add a address to an user', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).post(`/users/${user.id}/addresses`).send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: 15
        });

        expect(response.status).toBe(200);
        expect(parseInt(response.body.user_id)).toBe(user.id);
    });

    it('shoud update a address', async () => {

        const user = await factories.create('User');

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).put(`/users/${user.id}/addresses/${userAddr.id}`).send({
            street: 'rua test'
        });

        expect(response.status).toBe(200);
        expect(response.body[1]).toBe(1);
    });

    it('shoud erase a address from a user', async () => {

        const user = await factories.create('User');

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).delete(`/users/${user.id}/addresses/${userAddr.id}`);
        
        expect(response.status).toBe(200);
    });
});