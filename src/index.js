import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';

const handleError = (response, errorMessage, errorContainer) => {
    console.error("Error in getConversionFrom:", response);

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
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("h3");

    return { currencyOne, currencyTwo, errorContainer, errorMessage };
};

const getConversionFrom = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one").value;
    const amountTwo = document.getElementById("amount-two");

    vars.errorContainer.innerText = "";

    if (!vars.currencyOne || !vars.currencyTwo) {
        vars.errorMessage.innerText = "Please enter two currencies to exchange between.";
        vars.errorContainer.append(vars.errorMessage);

    } else {

        const response = await ConvertCurrency.getConversion(vars.currencyOne, vars.currencyTwo);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountTwo.value = (amountOne * conversionRate);
        } else {
            handleError(response, vars.errorMessage, vars.errorContainer);
        }
    }
};

const getConversionTo = async () => {
    const vars = getVariables();
    const amountOne = document.getElementById("amount-one");
    const amountTwo = document.getElementById("amount-two").value;

    vars.errorContainer.innerText = "";

    if (!vars.currencyOne || !vars.currencyTwo) {
        vars.errorMessage.innerText = "Please enter to currencies to exchange between.";
        vars.errorContainer.append(vars.errorMessage);
    } else {
        const response = await ConvertCurrency.getConversion(vars.currencyTwo, vars.currencyOne);

        if (response.conversion_rate) {
            const conversionRate = response.conversion_rate;
            amountOne.value = (amountTwo * conversionRate);

        } else {
            handleError(response, vars.errorMessage, vars.errorContainer);
        }
    }
};

const showCurrencies = async () => {
    const currencies = document.getElementById("currencies");
    const currencyList = document.getElementById("currency-list");
    const response = await ConvertCurrency.getConversion("USD");

    Object.keys(response.conversion_rates).forEach((key) => {
        const currency = document.createElement("li");
        currency.append(key);
        currencyList.append(currency);
    });

    currencies.append(currencyList);
};

document.getElementById("amount-one").addEventListener("input", getConversionFrom);
document.getElementById("amount-two").addEventListener("input", getConversionTo);
document.getElementById("get-currency").addEventListener("click", showCurrencies);


//Need to switch the API to the pair conversion option to get better error handling. Use the standard API to get the list of all currency codes.