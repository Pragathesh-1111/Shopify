import { priceConversion } from "./configCurrency.js";
import { selectedCountry } from "./config.js";
import { dom } from "./dom.js";

export const normalizedDummy = function (data, categoryID, ratingSTARS) {
  return data.products.map((product) => {
    return {
      id: product.id,
      API: "DUMMY",
      title: product.title,
      rating: product.rating,
      ratingStars: ratingSTARS[Math.floor(product.rating * 2) / 2],
      reviews: [...product.reviews],
      hashID: categoryID[product.category],
      description: product.description,
      category: product.category,
      image: product.images[0],
    };
  });
};

export const normalizedFake = function (data, categoryID, ratingSTARS) {
  return data.map((product) => {
    return {
      id: product.id,
      API: "FAKE",
      hashID: categoryID[product.category],
      title: product.title,
      rating: product.rating.rate,
      ratingStars: ratingSTARS[Math.floor(product.rating.rate * 2) / 2],
      description: product.description,
      category: product.category,
      image: product.image,
    };
  });
};

export const truncateTitle = function (title, limit = 3) {
  const words = title.split(" ");
  if (words.length <= limit) return title;

  return words.slice(0, limit).join(" ") + "...";
};

export const normalizeSingleDummy = async function (
  product,
  categoryID,
  STARS,
) {
  const priceConvert = await priceConversion(product.price, selectedCountry);
  return {
    id: product.id,
    API: "DUMMY",
    title: product.title,
    dataID: categoryID[product.category],
    price: +(priceConvert.price).toFixed(2),
    symbol: priceConvert.symbol,
    description: product.description,
    category: product.category,
    image: product.images[0],
    ratingStars: STARS[Math.round(product.rating * 2) / 2],
  };
};

export const normalizeSingleFake = async function (product, categoryID, STARS) {
  const priceConvert = await priceConversion(product.price, selectedCountry);
  return {
    id: product.id,
    API: "FAKE",
    title: product.title,
    dataID: categoryID[product.category],
    price: +(priceConvert.price).toFixed(2),
    symbol: priceConvert.symbol,
    description: product.description,
    category: product.category,
    image: product.image,
    ratingStars: STARS[Math.floor(product.rating.rate * 2) / 2],
  };
};

export const renderSpinner = function (parentElement) {
  parentElement.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;
};

export const toastBehaviorHelper = function (
  domContainer,
  domMessage,
  message,
  toastDisapprearTime,
) {
  domMessage.innerHTML = message;
  domContainer.classList.remove("hidden");

  setTimeout(() => {
    domContainer.classList.add("hidden");
  }, toastDisapprearTime * 1000);
};

export const findCartItem = function (cartItems, product) {
  const [API, id] = product.id.split("-");
  return cartItems.find(
    (item) => item.product?.id === +id && item.product.API === API,
  );
};

export const emptyCartHelper = function() {
  dom.cartItemsSlot.innerHTML = `<div class="empty--cart"><h2>Your cart is empty</h2></div>`
  dom.subTotal.innerHTML = dom.total.innerHTML = '-----'
}