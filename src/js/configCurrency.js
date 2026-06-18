import { getJSON } from "./getJSON.js";
import { countriesAvailable,selectedCountry } from "./config.js";
import { API_CURRENCY } from "./config.js";

export const priceConversion = async function(price) {
    const data = await getJSON(`${API_CURRENCY.HTTP}${API_CURRENCY.ID}/pair/USD/${countriesAvailable[selectedCountry].countryCode}`)
    return {
        price : data.conversion_rate * +price,
        symbol: countriesAvailable[selectedCountry].symbol
    }
}