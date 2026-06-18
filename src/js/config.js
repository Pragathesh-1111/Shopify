import {
  menShirtSVG,
  jewelerySVG,
  womenDressSVG,
  electronicsSVG,
  lipstickSVG,
  perfumeSVG,
  furnitureSVG,
  appleSVG,
} from "../assets/icons.js";

// In USD
export const BASE_CHARGES_FREEDELIVERY = {
  freeDelivery: 15.8, //$
  charges: 2, //$
};

export const API_CURRENCY = {
  HTTP: "https://v6.exchangerate-api.com/v6/",
  ID: "0288d7d0c2bd2535ab767021",
};
import { priceConversion } from "./configCurrency.js";

export const countriesAvailable = {
  India: {
    countryCode: "INR",
    symbol: "₹",
  },
  Germany: {
    countryCode: "EUR",
    symbol: "€",
  },
};
export let selectedCountry = "India";

export const toastDisapprearTime = 2; // Seconds

export const heroImg = {
  images: [
    new URL("../image/shirt-img1.jpg", import.meta.url).href,
    new URL("../image/shirt-img2.jpg", import.meta.url).href,
    new URL("../image/shirt-img3.jpg", import.meta.url).href,
    new URL("../image/shirt-img4.jpg", import.meta.url).href,
  ],
  duration: 5, // In seconds
  fadeDuration: 1200, // In Milliseconds
};

export const marqueeMessage = [
  "24 Hours Available",
  `Free Shipping Over ${await priceConversion(BASE_CHARGES_FREEDELIVERY.freeDelivery).then((el) => Math.trunc(el.price))}${countriesAvailable[selectedCountry].symbol}`,
  "New Arrivals Weekly",
  "30 Days Return",
  "World Wide Delivery",
  "Objects of Pure Intention",
];
export const marqueeSpeed = 13; // In seconds

export const API_URLS = {
  API_URL_DUMMY: "https://dummyjson.com/products/",
  API_URL_FAKE: "https://fakestoreapi.com/products/",
};

export const SVGs = {
  "men's clothing": menShirtSVG,
  "women's clothing": womenDressSVG,
  jewelery: jewelerySVG,
  electronics: electronicsSVG,
  beauty: lipstickSVG,
  fragrances: perfumeSVG,
  furniture: furnitureSVG,
  groceries: appleSVG,
};

export const categoryID = {
  "men's clothing": "category-men-clothes",
  "women's clothing": "category-women-clothes",
  jewelery: "category-jewelery",
  electronics: "category-electronics",
  beauty: "category-lipstick",
  fragrances: "category-perfume",
  furniture: "category-furniture",
  groceries: "category-grocery",
};

export const STARS = {
  1: "★☆☆☆☆",
  1.5: "★⯨☆☆☆",

  2: "★★☆☆☆",
  2.5: "★★⯨☆☆",

  3: "★★★☆☆",
  3.5: "★★★⯨☆",

  4: "★★★★☆",
  4.5: "★★★★⯨",

  5: "★★★★★",
};
