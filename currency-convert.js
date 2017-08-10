// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries.

const axios = require('axios');

var proxy = {
    proxy: {
        host: '127.0.0.1', 
        port: 808
    }
}

const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`, proxy).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`, proxy).then((res) => {
        return res.data.map((country) => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);          
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    })
};

// Create convertCurrencyAlt as async function
// Get countries and rate using await and our two function
// Calculate extanchedAmount
// Return status string
const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;

}


convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
    console.log(status);
})

// getExchangeRate('USD', 'EUR').then((rate) => {
//     console.log(rate);
// });

// getCountries('CAD').then((countries) => {
//     console.log(countries);
// }).catch ((e) => {
//     console.log(e);
// })