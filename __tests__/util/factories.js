const { factory } = require('factory-girl');
const faker = require('faker');

const autoRequireAll = require('../../src/util/autoRequireAll');

const { User } = autoRequireAll(__dirname, '../../src/models');

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: faker.random.number()
});

module.exports = factory;