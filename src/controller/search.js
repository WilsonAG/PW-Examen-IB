const { isValid } = require('../controller/country');


const find = (data, country, year) => {
    let countryCode = country.toUpperCase()
    if (!isValid(countryCode)) {
        throw new Error('El pais ingresado no esta en un formato valido.')
    }

    if (isNaN(year)) {
        throw new Error('El anio debe ser un numero.')
    }

    let myCountry = data.find(country => country['Country Code'] === countryCode)

    return {
        name: myCountry['Country Name'],
        code: myCountry['Country Code'],
        year: +year,
        value: myCountry[+year]
    }
}

module.exports = {
    find
}