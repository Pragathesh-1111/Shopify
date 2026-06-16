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

const currency = {
  indian: "&#8377;",
  usa: "$",
};

export const heroImg = {
  images: [
    "./src/image/shirt-img1.jpg",
    "./src/image/shirt-img2.jpg",
    "./src/image/shirt-img3.jpg",
    "./src/image/shirt-img4.jpg",
  ],
  duration: 5, // In seconds
  fadeDuration: 1200, // In Milliseconds
};

export const marqueeMessage = [
  "24 Hours Available",
  `Free Shipping Over 1500${currency.indian}`,
  "New Arrivals Weekly",
  "30 Days Return",
  "World Wide Delivery",
  "Objects of Pure Intention",
];
export const marqueeSpeed = 13; // In seconds

export const URL = {
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
  "men's clothing": 'category-men-clothes',
  "women's clothing": 'category-women-clothes',
  jewelery: 'category-jewelery',
  electronics: 'category-electronics',
  beauty: 'category-lipstick',
  fragrances: 'category-perfume',
  furniture: 'category-furniture',
  groceries: 'category-grocery',
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