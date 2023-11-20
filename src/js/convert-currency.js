export default class ConvertCurrency {

    static async getConversion(currency) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
            const responseData = await response.json();
            if (!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${responseData["error-type"]}`;
                console.log(errorMessage);
                throw new Error(errorMessage);
            }
            return responseData;
        } catch (error) {
            return error;
        }
    }
}