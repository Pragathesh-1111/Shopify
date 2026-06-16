import {
  marqueeMessage,
  marqueeSpeed,
  heroImg,
  URL,
  categoryID,
  STARS,
} from "./config.js";
import { getJSON } from "./getJSON.js";
import {
  normalizedDummy,
  normalizedFake,
  normalizeSingleDummy,
  normalizeSingleFake,
} from "./helper.js";

export const state = {
  marquee: marqueeMessage,
  marqueeSpeed,

  heroImages: heroImg.images,
  heroImageDuration: heroImg.duration,
  heroImageFadeDuration: heroImg.fadeDuration,

  categories: [],
  products: [], // Main array of all products

  product: null,
};

export const getAllProducts = async function () {
  try {
    const [dummyData, fakeData] = await Promise.all([
      getJSON(URL.API_URL_DUMMY),
      getJSON(URL.API_URL_FAKE),
    ]);

    const products = [
      ...normalizedDummy(dummyData, categoryID, STARS),
      ...normalizedFake(fakeData, categoryID, STARS),
    ];
    state.products = products;
  } catch (err) {
    throw err;
  }
};

export const getProduct = async function (API, ID) {
  try {
    const data = await getJSON(`${URL["API_URL_" + API]}`, ID);
    state.product =
      API === "DUMMY"
        ? normalizeSingleDummy(data, categoryID, STARS)
        : normalizeSingleFake(data, categoryID, STARS);
  } catch (err) {
    throw err;
  }
};
