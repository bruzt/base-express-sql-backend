const path = require('path');
const fs = require('fs');

function autoRequire(sourcePath, dirPath) {

    const requires = {};

    var normalizedPath = path.join(sourcePath, dirPath);

    fs.readdirSync(normalizedPath).forEach( (file) => {

        fileName = file.split('.')[0] // remove .js
        
        requires[fileName] = require(`${normalizedPath}/` + file);
    });

    return requires;
}

module.exports = autoRequire;