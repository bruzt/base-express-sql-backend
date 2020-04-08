const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('addressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all address of a user', async () => {

        const user = await factories.create('User');
        
        await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).get(`/users/${user.id}/addresses`)
        
        expect(response.status).toBe(200);
        expect(response.body[0].user_id).toBe(user.id);
    });

    it('should return code 400 for "id reference must be a number" - index', async () => {

        const response = await supertest(app).get(`/users/b/addresses`)
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "user not found" - index', async () => {

        const response = await supertest(app).get(`/users/2/addresses`)
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should add a address to an user', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).post(`/users/${user.id}/addresses`).send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: '15'
        });

        expect(response.status).toBe(200);
        expect(parseInt(response.body.user_id)).toBe(user.id);
    });

    it('should return code 400 for "user_id reference must be a number" - store', async () => {

        const response = await supertest(app).post(`/users/c/addresses`).send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: 15
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "one or more fields are missing" - store', async () => {

        const response = await supertest(app).post(`/users/1/addresses`).send({
            zipcode: '21119624',
            number: 15
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "user not found" - store', async () => {
        
        const response = await supertest(app).post(`/users/30/addresses`).send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: '15'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should update a address', async () => {

        const user = await factories.create('User');

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).put(`/users/${user.id}/addresses/${userAddr.id}`).send({
            street: 'rua test'
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "id reference must be a number" - update', async () => {

        const response = await supertest(app).put(`/users/1/addresses/d`).send({
            street: 'rua test'
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "user not found" - update', async () => {

        const response = await supertest(app).put(`/users/4/addresses/5`).send({
            street: 'rua test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "address not found" - update', async () => {

        const user = await factories.create('User');

        const response = await supertest(app).put(`/users/${user.id}/addresses/5`).send({
            street: 'rua test'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should erase a address from a user', async () => {

        const user = await factories.create('User');

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).delete(`/users/${user.id}/addresses/${userAddr.id}`);
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "id referance must be a number" - Destroy', async () => {

        const response = await supertest(app).delete(`/users/e/addresses/1`);
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "user not found" - Destroy', async () => {

        const response = await supertest(app).delete(`/users/9/addresses/1`);
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "address not found" - delete', async () => {

        const user = await factories.create('User');

        const response = await supertest(app).delete(`/users/${user.id}/addresses/2`);
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});