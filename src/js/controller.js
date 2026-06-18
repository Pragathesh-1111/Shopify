"use strict";

import { dom } from "./dom.js";
import { handleRevealSection, observerOptions } from "./sectionObserver.js";
import {
  state,
  getAllProducts,
  getProduct,
  addStateToCart,
  resetCurrentProductState,
  increaseProductViewItemCount,
  decreaseProductViewItemCount,
  increaseCartViewItemCount,
  decreaseCartViewItemCount,
  clearCartsState,
} from "./model.js";
import marqueeView from "./animation/marqueeView.js";
import heroAnimation from "./animation/heroAnimation.js";
import cartView from "./view/cartView.js";
import addToCartView from "./view/addToCartView.js";
import productView from "./view/productView.js";
import productDetailView from "./view/productDetailView.js";
import { toastDisapprearTime } from "./config.js";
import { toastBehaviorHelper } from "./helper.js";
import { getTotalLogic } from "./totalCalculationLogic.js";
import { renderSpinner } from "./helper.js";

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

const controlCart = function () {
  cartView.toggleCart();
};

const controlProductView = async function () {
  try {
    await getAllProducts();
    const data = state.products;
    productView.renderCategory(data);
    productView.renderProducts(data);
  } catch (err) {
    toastBehaviorHelper(dom.toast, dom.toastMessage, err, toastDisapprearTime);
  }
};

const categoryClicksController = function (hashID) {
  window.location.hash = hashID;
};

const productClicksController = async function (API, ID) {
  try {
    productDetailView.openProductDisplay();
    await getProduct(API, ID);
    productDetailView.render(state.product);
  } catch (err) {
    toastBehaviorHelper(dom.toast, dom.toastMessage, err, toastDisapprearTime);
  }
};

const controlAddTocart = async function () {
  addStateToCart(state.product, state.productCount);
  const [subTotal, symbol] = cartView.render(state.cartItems);

  // Logic for adding all taxes in FUTURE//

  const total = await getTotalLogic(subTotal);
  cartView.renderTotal(total, symbol);

  //... ... ...

  toastBehaviorHelper(
    dom.toast,
    dom.toastMessage,
    "Added to cart !",
    toastDisapprearTime,
  );
};

const controlCartItemCount = async function (btn, product) {
  const adjustedItem = btn.classList.contains("cart--item-increase-btn")
    ? increaseCartViewItemCount(product)
    : decreaseCartViewItemCount(product);

  if (!adjustedItem) {
    cartView.render(state.cartItems);
    return;
  }
  const subTotal = cartView.calculateSubTotal(state.cartItems)
  cartView.adjustCartViewItemCount(adjustedItem);
  cartView.renderSubTotal(subTotal, state.prevProduct.symbol);
  
  renderSpinner(dom.total)


  const total = await getTotalLogic(subTotal);
  cartView.renderTotal(total, state.prevProduct.symbol);
};

const controlProductDetailItemCount = function (btn) {
  btn.classList.contains("product-detail__increase-btn")
    ? increaseProductViewItemCount()
    : decreaseProductViewItemCount();

  productDetailView.adjustProductViewItemCount(state.productCount);
};

const controlCheckout = function () {
  const valid = cartView.checkCheckoutValid(state.cartItems);

  if (!valid)
    return toastBehaviorHelper(
      dom.toast,
      dom.toastMessage,
      "No items in cart !",
      toastDisapprearTime,
    );

  toastBehaviorHelper(
    dom.toast,
    dom.toastMessage,
    "Purchased successfully !",
    toastDisapprearTime,
  );

  cartView.toggleCart();
  clearCartsState();
  cartView.emptyCart();
};

const init = async function () {
  controlHeroImg();
  controlMarquee();
  cartView.addHandlerOpenCart(controlCart);
  cartView.addHandlerCloseCart(controlCart);
  cartView.addCheckoutHandler(controlCheckout);
  cartView.cartItemCountHandler(controlCartItemCount);
  productDetailView.productCountHandler(controlProductDetailItemCount);

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("section--hidden");
    sectionObserver.observe(section);
  });

  await controlProductView();
  productView.addHandlerClicks(categoryClicksController);
  productView.addHandlerProductClicks(productClicksController);
  productDetailView.closeProductHandler(resetCurrentProductState);
  addToCartView.addAddToCartHandler(controlAddTocart);
};
init();
