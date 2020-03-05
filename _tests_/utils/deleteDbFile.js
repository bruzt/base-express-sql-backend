const fs = require('fs');

function deleteDbFile(){

    fs.unlinkSync('./_tests_/database.sqlite')
}

module.exports = deleteDbFile();