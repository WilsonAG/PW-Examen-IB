const chalk = require('chalk');

const { argv } = require('./config/yargs');
const file = require('./controller/file');

let command = argv._[0];

let path = argv.f

switch (command) {
    case 'mostrar':
        file.importData(path).catch(console.log)
        break;

    case 'guardar':
        console.log('guardar')
        break;

    default:
        console.log(chalk.bgRedBright.bold.whiteBright('Comando no valido.'))
        break;
}