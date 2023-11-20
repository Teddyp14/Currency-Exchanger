import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';

const getConversionFrom = async () => {

    const fromCurrency = document.getElementById("from-currency").value;
    const fromAmount = document.getElementById("from-amount").value;
    const toCurrency = document.getElementById("to-currency").value;
    const toAmount = document.getElementById("to-amount");
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("h3");

    if (!fromCurrency || !toCurrency) {
        errorMessage.innerText = "Please enter to currencies to exchange between.";
        errorContainer.innerText = "";
        errorContainer.append(errorMessage);

    } else {

        const response = await ConvertCurrency.getConversion(fromCurrency);

        if (response.conversion_rates) {
            const conversionRate = response.conversion_rates[toCurrency];
            toAmount.value = (fromAmount * conversionRate);
        }

        else {
            console.error("Error in getConversion:", response);

            errorMessage.innerText = `${response}. We are unable to retrieve conversion rates.`;
            errorContainer.innerText = "";
            errorContainer.append(errorMessage);
        }
    }
};

const getConversionTo = async () => {

    const fromCurrency = document.getElementById("from-currency").value;
    const fromAmount = document.getElementById("from-amount");
    const toCurrency = document.getElementById("to-currency").value;
    const toAmount = document.getElementById("to-amount").value;
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("h3");

    if (!fromCurrency || !toCurrency) {
        errorMessage.innerText = "Please enter to currencies to exchange between.";
        errorContainer.innerText = "";
        errorContainer.append(errorMessage);
    } else {
        const response = await ConvertCurrency.getConversion(toCurrency);

        if (response.conversion_rates) {
            const conversionRate = response.conversion_rates[fromCurrency];
            fromAmount.value = (toAmount * conversionRate);
        }

        else {
            console.error("Error in getConversion:", response);
            errorMessage.innerText = `${response}. We are unable to retrieve conversion rates.`;
            errorContainer.innerText = "";
            errorContainer.append(errorMessage);
        }
    }
};

document.getElementById("from-amount").addEventListener("input", getConversionFrom);
document.getElementById("to-amount").addEventListener("input", getConversionTo);