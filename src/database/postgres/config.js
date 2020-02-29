
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'cliente1',
    password: '123',
    database: 'tests',
    define: {
        timestamps: true,
        underscored: true, // Snake_Case
        //freezeTableName: true, // disable the modification of tablenames into plural
    },
    quoteIdentifiers: false, // torna nomes das tabelas e atributo case-insensitive
    //logging: false, // disable logging queries; default: console.log
}