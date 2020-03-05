const fs = require('fs');

module.exports = {

    createDbFile: () => {
    
        fs.writeFileSync('./_tests_/database.sqlite')
    }
}