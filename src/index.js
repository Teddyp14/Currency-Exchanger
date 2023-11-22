import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';
import GetCurrencies from './js/get-currencies';

const getVariables = () => {
    const currencyOne = (document.getElementById("currency-one").value).toUpperCase();
    const currencyTwo = (document.getElementById("currency-two").value).toUpperCase();
    const infoDisplay = document.getElementById("info-display");
    const rate = document.createElement("h3");
    const errorMessage = document.createElement("h3");

    return { currencyOne, currencyTwo, infoDisplay, rate, errorMessage };
};

const handleError = (response, errorMessage, infoDisplay) => {
    console.error("Error: ", response);
    infoDisplay.innerText = "";

    if (response.message.includes("404")) {
        errorMessage.innerText = `${response}. Invalid currency code. Please select from the list provided.`;
        infoDisplay.append(errorMessage);
    } else {
        errorMessage.innerText = `${response}. We are unable to retrieve conversion rates.`;
        infoDisplay.append(errorMessage);
    }
};

const printError = (errorMessage, infoDisplay) => {
    infoDisplay.innerText = "";
    errorMessage.innerText = "Please enter two currencies to exchange between.";
    infoDisplay.append(errorMessage);
};

const printRate = (infoDisplay, rate, conversionRate, currencyOne, currencyTwo) => {
    infoDisplay.innerText = "";
    rate.innerText = `1 ${currencyOne} equals ${conversionRate} ${currencyTwo}`;
    infoDisplay.append(rate);

};

const getConversionOne = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one").value;
    const amountTwo = document.getElementById("amount-two");

    if (!vars.currencyOne || !vars.currencyTwo) {
        printError(vars.errorMessage, vars.infoDisplay);

    } else {
        const response = await ConvertCurrency.getConversion(vars.currencyOne, vars.currencyTwo);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountTwo.value = (amountOne * conversionRate);
            printRate(vars.infoDisplay, vars.rate, conversionRate, vars.currencyOne, vars.currencyTwo);
        } else {
            handleError(response, vars.errorMessage, vars.infoDisplay);
        }
    }
};

const getConversionTwo = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one");
    const amountTwo = document.getElementById("amount-two").value;

    vars.infoDisplay.innerText = "";

    if (!vars.currencyOne || !vars.currencyTwo) {
        printError(vars.errorMessage, vars.infoDisplay);
    } else {
        const response = await ConvertCurrency.getConversion(vars.currencyTwo, vars.currencyOne);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountOne.value = (amountTwo * conversionRate);
            printRate(vars.infoDisplay, vars.rate, conversionRate, vars.currencyTwo, vars.currencyOne);
        } else {
            handleError(response, vars.errorMessage, vars.infoDisplay);
        }
    }
};

const codeConvertOne = () => {
    const vars = getVariables();

    if (vars.currencyOne.length === 3) {
        getConversionOne();
    }
};

const codeConvertTwo = () => {
    const vars = getVariables();

    if (vars.currencyTwo.length === 3) {
        getConversionTwo();
    }
};

const showCurrencies = async () => {
    const currencies = document.getElementById("currencies");
    const currencyList = document.getElementById("currency-list");
    const response = await GetCurrencies.getCurrencies();
    const codeError = document.getElementById("code-error");
    const errorMessage = document.createElement("h3");

    codeError.innerText = "";

    if (response.conversion_rates) {
        Object.keys(response.conversion_rates).forEach((key) => {
            const currency = document.createElement("li");
            currency.append(key);
            currencyList.append(currency);
        });
        currencies.append(currencyList);
    } else {
        errorMessage.innerText = `${response}. Unable to retrieve currency codes.`;
        codeError.append(errorMessage);
    }
};

document.getElementById("amount-one").addEventListener("input", getConversionOne);
document.getElementById("amount-two").addEventListener("input", getConversionTwo);
document.getElementById("currency-one").addEventListener("input", codeConvertOne);
document.getElementById("currency-two").addEventListener("input", codeConvertTwo);
document.getElementById("get-currency").addEventListener("click", showCurrencies);


