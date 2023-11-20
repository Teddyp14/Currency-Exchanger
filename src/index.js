import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';

const getConversion = async () => {
    const fromCurrency = document.getElementById("from-currency").value;
    const fromAmount = document.getElementById("from-amount").value;
    const toCurrency = document.getElementById("to-currency").value;
    const toAmount = document.getElementById("to-amount");

    const conversionResponse = await ConvertCurrency.getConversion(fromCurrency);

    if (conversionResponse.conversion_rates) {
        const conversionRate = conversionResponse.conversion_rates[toCurrency];
        toAmount.value = (fromAmount * conversionRate);
    } else {
        console.log("reached the error")
        const errorcontainer = document.getElementById("error-container");
        const errorMessage = document.createElement("h3");
        errorMessage.append(conversionResponse);
        errorcontainer.append(errorMessage);
    }

    // try {
    //     const conversionResponse = await ConvertCurrency.getConversion(fromCurrency);

    //     if (!conversionResponse || conversionResponse.result !== "success") {
    //         throw new Error(`Error type: ${conversionResponse[3]}. Failed to retrieve conversion rates.`);
    //     } else {
    //         const conversionRate = conversionResponse.conversion_rates[toCurrency];

    //         toAmount.value = (fromAmount * conversionRate);
    //     }
    // } catch (error) {
    //     const errorcontainer = document.getElementById("error-container");
    //     const errorMessage = document.createElement("h3");
    //     errorMessage.append(error.message);
    //     errorcontainer.append(errorMessage);
    // }

};

document.getElementById("from-amount").addEventListener("input", getConversion);