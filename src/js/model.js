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
  findCartItem
} from "./helper.js";

///////////////////////////////////

export const state = {
  marquee: marqueeMessage,
  marqueeSpeed,

  heroImages: heroImg.images,
  heroImageDuration: heroImg.duration,
  heroImageFadeDuration: heroImg.fadeDuration,

  categories: [],
  products: [], // Main array of all products

  product: null,
  productCount: 1,

  cartItems: [],
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

export const addStateToCart = function (product, productCount) {
  const alreadyExist = state.cartItems.some(
    (item) =>
      item.product?.id === product?.id && item.product?.API === product.API,
  );
  if (alreadyExist) {
    return (state.cartItems.find(
      (item) => item.product.id === product.id,
    ).count += productCount);
  }

  state.cartItems.push({
    product,
    count: productCount,
  });
};

export const resetCurrentProductState = function () {
  state.product = null;
  state.productCount = 1;
};

export const clearCartsState = function () {
  state.cartItems = []
}

export const increaseProductViewItemCount = function () {
  state.productCount++;
};
export const decreaseProductViewItemCount = function () {
  if (1 >= state.productCount) return;
  state.productCount--;
};

export const increaseCartViewItemCount = function(product) {
  const existingProduct = findCartItem(state.cartItems, product)
  existingProduct.count++
  return existingProduct
}
export const decreaseCartViewItemCount = function(product) {
  const existingProduct = findCartItem(state.cartItems, product)
  if(1 >= existingProduct.count) return
  existingProduct.count--
  return existingProduct
}