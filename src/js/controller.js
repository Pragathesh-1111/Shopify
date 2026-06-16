"use strict";

import { dom } from "./dom.js";
import { handleRevealSection, observerOptions } from "./sectionObserver.js";
import { state, getAllProducts, getProduct } from "./model.js";
import marqueeView from "./animation/marqueeView.js";
import heroAnimation from "./animation/heroAnimation.js";
import cartView from "./view/cartView.js";
import productView from "./view/productView.js";
import productDetailView from "./view/productDetailView.js";

////////////////////////////////////////////////////////////

const sectionObserver = new IntersectionObserver(
  handleRevealSection,
  observerOptions,
);

const controlHeroImg = function () {
  heroAnimation.startRotation(state);
};

const controlMarquee = function () {
  marqueeView.renderMarquee(state.marquee, state.marqueeSpeed);
};

const controlCartBehaviour = function () {
  cartView._toggleCart();
};

const controlProductView = async function () {
  try {
    await getAllProducts();
    const data = state.products;
    productView.renderCategory(data);
    productView.renderProducts(data);

    // dom.shopSection.classList.remove("section--hidden");
  } catch (err) {
    console.error(err);
  }
};

const categoryClicksController = function(hashID) {
  window.location.hash = hashID
}

const productClicksController = async function(API, ID) {
  await getProduct(API, ID);
  console.log(state.product)
}

const init = async function () {
  controlHeroImg();
  controlMarquee();
  cartView.addHandlerOpenCart(controlCartBehaviour);
  cartView.addHandlerCloseCart(controlCartBehaviour);

  document.querySelectorAll('section').forEach((section) => {
    section.classList.add("section--hidden");
    sectionObserver.observe(section);
  });

  await controlProductView();
  productView.addHandlerClicks(categoryClicksController)
  productDetailView.addHandlerProductClicks(productClicksController)
};
init();