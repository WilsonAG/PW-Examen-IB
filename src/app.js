const chalk = require('chalk');

const { argv } = require('./config/yargs');
const file = require('./controller/country');
const { find } = require('./controller/search');

let command = argv._[0];

let path = argv.archivo
let country = argv.pais
let year = argv.anio

file.importData(path)
    .then(data => {
        switch (command) {
            case 'mostrar':
                let myData = find(data, country, year)
                console.log(myData)
                break;

            case 'guardar':
                console.log('guardar')
                break;

            default:
                console.log(chalk.bgRedBright.bold.whiteBright('Comando no valido.'))
                break;
        }
    })
    .catch(console.log)
