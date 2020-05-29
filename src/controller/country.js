const validCountries = require('../model/country.json');

const csvtojson = require('csvtojson');
const { promises: fs } = require('fs');

const importData = async (file) => {
    const csvFile = await fs.readFile(file, 'utf-8')
        .catch(err => { throw new Error('El archivo no se encuentra.') })

    let lines = csvFile.split(/\r?\n/);
    let csvString = ''
    lines.filter((value, index) => {
        if (index >= 4) {
            csvString += value + '\n'
        }
    });

    let csvData = await csvtojson().fromString(csvString);
    if (csvData.length === 0) {
        throw new Error('El formato del archivo no es valido.')
    }

    csvData = csvData.filter(record => {
        if (isValid(record['Country Code'])) {
            delete record['Indicator Name']
            delete record['Indicator Code']
            delete record['field65']
            return record
        }
    });

    return csvData;
}


const isValid = (countryCode) => {
    const validCodes = validCountries.code;
    let valid = validCodes.includes(countryCode);

    return valid;
}

module.exports = {
    importData,
    isValid
}