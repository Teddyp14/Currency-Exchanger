import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import ConvertCurrency from './js/convert-currency';

const getConversion = async () => {
    try {
        const fromCurrency = document.getElementById("from-currency").value;
        const fromAmount = document.getElementById("from-amount").value;
        const toCurrency = document.getElementById("to-currency").value;
        const toAmount = document.getElementById("to-amount");

        const conversionResponse = await ConvertCurrency.getConversion(fromCurrency);

        const conversionRate = conversionResponse.conversion_rates[toCurrency];
        toAmount.value = (fromAmount * conversionRate);

    } catch (error) {
        console.error("Error in getConversion:", error.message);
        const errorContainer = document.getElementById("error-container");
        const errorMessage = document.createElement("h3");
        errorMessage.textContent = "An error occurred: " + error.message;
        errorContainer.innerHTML = "";
        errorContainer.append(errorMessage);
    }
};






// const getConversion = async () => {
//     const fromCurrency = document.getElementById("from-currency").value;
//     const fromAmount = document.getElementById("from-amount").value;
//     const toCurrency = document.getElementById("to-currency").value;
//     const toAmount = document.getElementById("to-amount");

//     try {
//         const conversionResponse = await ConvertCurrency.getConversion(fromCurrency);

//         if (conversionResponse.conversion_rates) {
//             const conversionRate = conversionResponse.conversion_rates[toCurrency];
//             toAmount.value = (fromAmount * conversionRate);
//         } else {
//             throw new Error("Failed to retrieve conversion rates.");
//         }
//     }
//     catch (error) {
//         const errorcontainer = document.getElementById("error-container");
//         const errorMessage = document.createElement("h3");
//         errorMessage.innerText = `An error occurred: ${error.message}`;
//         errorcontainer.append(errorMessage);
//     }

// }

document.getElementById("from-amount").addEventListener("input", getConversion);