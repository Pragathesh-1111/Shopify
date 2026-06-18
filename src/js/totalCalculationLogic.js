import { BASE_CHARGES_FREEDELIVERY } from "./config.js";
import { priceConversion } from "./configCurrency.js";

export const getTotalLogic = async function (subTotal) {
  const freeDeliveryExceedingAmount = await priceConversion(BASE_CHARGES_FREEDELIVERY.freeDelivery);

  if(freeDeliveryExceedingAmount.price < subTotal) return subTotal

  const fakeAdditionalCharges = await priceConversion(BASE_CHARGES_FREEDELIVERY.charges);
  return +(+subTotal + +fakeAdditionalCharges.price).toFixed(2)
}