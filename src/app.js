#!/usr/bin/env node

const chalk = require('chalk');

const { argv } = require('./config/yargs');
const file = require('./controller/country');
const { find, save } = require('./controller/search');

let command = argv._[0];
let path = argv.archivo
let country = argv.pais
let year = argv.anio

file.importData(path)
    .then(data => {
        switch (command) {
            case 'mostrar':
                let myData = find(data, country, year)
                console.log(chalk.green('==================================================================='))
                console.log(chalk.green(`           ${myData.title}          `))
                console.log(chalk.green('==================================================================='))
                console.log(chalk.cyan('Nombre: ', chalk.yellow(myData.name)))
                console.log(chalk.cyan('Codigo: ', chalk.yellow(myData.code)))
                console.log(chalk.cyan('Anio: ', chalk.yellow(myData.year)))
                console.log(chalk.cyan('Valor: ', chalk.yellow(myData.value)))
                break;

            case 'guardar':
                let myData2 = find(data, country, year)
                save(myData2)
                    .then(path => {
                        console.log(chalk.cyan('Archivo guardado exitosamente: ', chalk.yellow(path)))
                    })
                    .catch(err =>
                        console.log(chalk.bgRedBright.bold.whiteBright('Error al escribir archivo')))
                break;

            default:
                console.log(chalk.bgRedBright.bold.whiteBright('Comando no valido.'))
                break;
        }
    })
    .catch(console.log)
