const { isValid, isValidYear } = require('../controller/country');
const { promises: fs, existsSync } = require('fs');
const path = require('path');


const find = (data, country = "ECU", year) => {
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
        title: myCountry['Indicator Name'],
        name: myCountry['Country Name'],
        code: myCountry['Country Code'],
        year: year,
        value
    }
}


const save = async (searchData) => {
    let data = `
    ===================================================================
                    ${searchData.title}
    ===================================================================
    Nombre: ${searchData.name} 
    Codigo: ${searchData.code}
    Anio:   ${searchData.year}
    Valor:  ${searchData.value}
    `
    let dir = path.resolve('./src', 'resultados')
    if (!existsSync(dir)) {
        await fs.mkdir(dir)
        await fs.writeFile(
            `src/resultados/${searchData.code}-${searchData.year}.txt`,
            data
        )
    } else {
        await fs.writeFile(
            `src/resultados/${searchData.code}-${searchData.year}.txt`,
            data
        )
    }


}

module.exports = {
    find,
    save
}