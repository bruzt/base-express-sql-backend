const supertest = require('supertest');

const truncate = require('../../util/truncate');
const factories = require('../../util/factories');
const app = require('../../../src/App');

describe('UserController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('shoud show all users, its addresses and, if have it, its techs', async () => {

        const user = await factories.create('User');

        await factories.create('Address', { user_id: user.id });
        await factories.create('Address', { user_id: user.id });
        
        const tech1 = await factories.create('Tech');
        const tech2 = await factories.create('Tech');
        const tech3 = await factories.create('Tech');

        await user.addTech(tech1);
        await user.addTech(tech2);
        await user.addTech(tech3);

        const response = await supertest(app).get('/report');
        
        expect(response.status).toBe(200);
        expect(response.body[0].addresses.length).toBe(2);
        expect(response.body[0].techs.length).toBe(3);
    });

});