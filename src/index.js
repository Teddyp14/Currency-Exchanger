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

    const conversionRate = conversionResponse.conversion_rates[toCurrency];

    toAmount.value = (fromAmount * conversionRate);
};

document.getElementById("from-amount").addEventListener("input", getConversion);