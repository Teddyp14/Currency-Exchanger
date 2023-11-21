import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';
import GetCurrencies from './js/get-currencies';

const handleError = (response, errorMessage, errorContainer) => {
    console.error("Error: ", response);

    if (response.message.includes("404")) {
        errorMessage.innerText = `${response}. Invalid currency code. Please select from the list provided.`;
        errorContainer.append(errorMessage);
    } else {
        errorMessage.innerText = `${response}. We are unable to retrieve conversion rates.`;
        errorContainer.append(errorMessage);
    }
};

const getVariables = () => {
    const currencyOne = (document.getElementById("currency-one").value).toUpperCase();
    const currencyTwo = (document.getElementById("currency-two").value).toUpperCase();
    const rateContainer = document.getElementById("conversion-rate");
    const rate = document.createElement("h3");
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("h3");

    return { currencyOne, currencyTwo, rateContainer, rate, errorContainer, errorMessage };
};

const printError = (errorMessage, errorContainer) => {
    errorMessage.innerText = "Please enter two currencies to exchange between.";
    errorContainer.append(errorMessage);
}

const printRate = (rate, rateContainer, conversionRate, currencyOne, currencyTwo) => {
    rate.innerText = `1 ${currencyOne} equals ${conversionRate} ${currencyTwo}`;
    rateContainer.append(rate);
}

const getConversionOne = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one").value;
    const amountTwo = document.getElementById("amount-two");

    vars.errorContainer.innerText = "";
    vars.rateContainer.innerText = "";

    if (!vars.currencyOne || !vars.currencyTwo) {
        printError(vars.errorMessage, vars.errorContainer)

    } else {
        const response = await ConvertCurrency.getConversion(vars.currencyOne, vars.currencyTwo);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountTwo.value = (amountOne * conversionRate);
            printRate(vars.rate, vars.rateContainer, conversionRate, vars.currencyOne, vars.currencyTwo)
        } else {
            handleError(response, vars.errorMessage, vars.errorContainer);
        }
    }
};

const getConversionTwo = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one");
    const amountTwo = document.getElementById("amount-two").value;

    vars.errorContainer.innerText = "";

    if (!vars.currencyOne || !vars.currencyTwo) {
        printError(vars.errorMessage, vars.errorContainer)
    } else {
        const response = await ConvertCurrency.getConversion(vars.currencyTwo, vars.currencyOne);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountOne.value = (amountTwo * conversionRate);
            printRate(vars.rate, vars.rateContainer, conversionRate, vars.currencyTwo, vars.currencyOne)
        } else {
            handleError(response, vars.errorMessage, vars.errorContainer);
        }
    }
};

const codeConvertOne = () => {
    const vars = getVariables();

    if (vars.currencyOne.length === 3) {
        getConversionOne();
    }
}

const codeConvertTwo = () => {
    const vars = getVariables();

    if (vars.currencyTwo.length === 3) {
        getConversionTwo();
    }
}

const showCurrencies = async () => {
    const currencies = document.getElementById("currencies");
    const currencyList = document.getElementById("currency-list");
    const response = await GetCurrencies.getCurrencies();


    Object.keys(response.conversion_rates).forEach((key) => {
        const currency = document.createElement("li");
        currency.append(key);
        currencyList.append(currency);
    });

    currencies.append(currencyList);
};

document.getElementById("amount-one").addEventListener("input", getConversionOne);
document.getElementById("amount-two").addEventListener("input", getConversionTwo);
document.getElementById("currency-one").addEventListener("input", codeConvertOne);
document.getElementById("currency-two").addEventListener("input", codeConvertTwo);
document.getElementById("get-currency").addEventListener("click", showCurrencies);


