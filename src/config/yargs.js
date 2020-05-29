let options = {
    archivo: {
        require: true,
        alias: 'f',
        desc: 'Archivo csv con los datos a procesar.'

    },
    pais: {
        default: 'ECU',
        alias: 'c',
        desc: 'Año que del que se busca información'
    },
    anio: {
        default: 1960,
        alias: 'y',
        desc: 'Código del país que se requiere información'
    }
}

const argv = require('yargs')
    .command('mostrar', 'Muestra los resultados en pantalla.', options)
    .command('guardar', 'Genera un archivo de texto con los resultados de la busqueda', options)
    .help()
    .demandCommand(1)
    .argv;

module.exports = {
    argv
}