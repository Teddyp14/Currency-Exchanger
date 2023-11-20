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
}

const getVariables = () => {
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("h3");

    return { fromCurrency, toCurrency, errorContainer, errorMessage };
}

const getConversionFrom = async () => {
    const vars = getVariables();
    const fromAmount = document.getElementById("from-amount").value;
    const toAmount = document.getElementById("to-amount");

    vars.errorContainer.innerText = "";

    if (!vars.fromCurrency || !vars.toCurrency) {
        vars.errorMessage.innerText = "Please enter two currencies to exchange between.";
        vars.errorContainer.append(vars.errorMessage);

    } else {

        const response = await ConvertCurrency.getConversion(vars.fromCurrency);

        if (response.conversion_rates) {
            const conversionRate = response.conversion_rates[vars.toCurrency];
            if (isNaN(conversionRate)) {
                vars.errorMessage.innerText = "Please enter a valid currency to convert between.";
                vars.errorContainer.append(vars.errorMessage);
            } else {
                toAmount.value = (fromAmount * conversionRate);
            }
        }

        else {
            handleError(response, vars.errorMessage, vars.errorContainer)
        }
    }
};

const getConversionTo = async () => {
    const vars = getVariables();
    const fromAmount = document.getElementById("from-amount");
    const toAmount = document.getElementById("to-amount").value;

    vars.errorContainer.innerText = "";

    if (!vars.fromCurrency || !vars.toCurrency) {
        vars.errorMessage.innerText = "Please enter to currencies to exchange between.";
        vars.errorContainer.append(vars.errorMessage);
    } else {
        const response = await ConvertCurrency.getConversion(vars.toCurrency);

        if (response.conversion_rates) {
            const conversionRate = response.conversion_rates[vars.fromCurrency];
            if (isNaN(conversionRate)) {
                vars.errorMessage.innerText = "Please enter a valid currency to convert between.";
                vars.errorContainer.append(vars.errorMessage);
            } else {
                fromAmount.value = (toAmount * conversionRate);
            }
        }

        else {
            handleError(response, vars.errorMessage, vars.errorContainer)
        }
    }
};

document.getElementById("from-amount").addEventListener("input", getConversionFrom);
// document.getElementById("from-currency").addEventListener("input", getConversionFrom)
document.getElementById("to-amount").addEventListener("input", getConversionTo);
// document.getElementById("to-currency").addEventListener("input", getConversionTo)