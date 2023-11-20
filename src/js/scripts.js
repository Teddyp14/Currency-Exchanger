export default class ConvertCurrency {

    static async getConversion(currency) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            return error;
        }
    }
}