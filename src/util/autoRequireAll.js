const path = require('path');
const fs = require('fs');

function autoRequire(sourcePath, dirPath) {

    const requires = {};

    var normalizedPath = path.join(sourcePath, dirPath);

    fs.readdirSync(normalizedPath).forEach( (file) => {

        const filePath = `${normalizedPath}/` + file;

        const type = fs.lstatSync(filePath);

        if(type.isFile()){ // verifica se é um arquivo e não um diretorio

            fileName = file.split('.')[0] // remove .js
            
            requires[fileName] = require(filePath);
        }
    });

    return requires;
}

module.exports = autoRequire;