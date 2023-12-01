export default class GetCurrencies {

    static async getCurrencies() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
            const responseData = await response.json();
            if (!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${responseData["error-type"]}`;
                throw new Error(errorMessage);
            }
            return responseData;
        } catch (error) {
            return error;
        }
    }
}