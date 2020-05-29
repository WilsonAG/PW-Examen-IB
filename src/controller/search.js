const { isValid, isValidYear } = require('../controller/country');


const find = (data, country, year) => {
    let countryCode = country.toUpperCase()
    if (!isValid(countryCode)) {
        throw new Error('El pais ingresado no esta en un formato valido.')
    }

    let myCountry = data.find(country => country['Country Code'] === countryCode)

    if (!isValidYear(myCountry, year)) {
        throw new Error('El anio ingresado no es valido, por favor ingrese uno entre 1960 y 2019');
    }

    if (myCountry[year] === '') {
        value = 'No hay un valor especificado.'
    } else {
        value = myCountry[year]
    }


    return {
        name: myCountry['Country Name'],
        code: myCountry['Country Code'],
        year: year,
        value
    }
}

module.exports = {
    find
}