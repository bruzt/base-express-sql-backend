require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    define: {
        timestamps: true,
        underscored: true, // snake_case
        //freezeTableName: true, // disable the modification of tablenames into plural
    },
    quoteIdentifiers: false, // torna nomes das tabelas e atributo case-insensitive
    logging: false, // disable logging queries; default: console.log
}