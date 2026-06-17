"use strict";

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
  clearCartsState
} from "./model.js";
import marqueeView from "./animation/marqueeView.js";
import heroAnimation from "./animation/heroAnimation.js";
import cartView from "./view/cartView.js";
import addToCartView from "./view/addToCartView.js";
import productView from "./view/productView.js";
import productDetailView from "./view/productDetailView.js";
import { toastDisapprearTime } from "./config.js";
import { toastBehaviorHelper } from "./helper.js";
import { dom } from "./dom.js";

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

const controlAddTocartBehaviour = function () {
  addStateToCart(state.product, state.productCount);
  cartView.render(state.cartItems);
  cartView.renderNavCount(state.cartItems)
  
  toastBehaviorHelper(
    dom.toast,
    dom.toastMessage,
    "Added to cart !",
    toastDisapprearTime,
  );
};

const controlCartItemCount = function (btn, product) {
  const adjustedItem = btn.classList.contains("cart--item-increase-btn")
  ? increaseCartViewItemCount(product)
  : decreaseCartViewItemCount(product);
  
  if(!adjustedItem) return
  cartView.adjustCartViewItemCount(adjustedItem)
};

const controlProductDetailItemCount = function (btn) {
  btn.classList.contains("product-detail__increase-btn")
  ? increaseProductViewItemCount()
  : decreaseProductViewItemCount();
  
  productDetailView.adjustProductViewItemCount(state.productCount)
};

const controlCheckout = function () {
  toastBehaviorHelper(
    dom.toast,
    dom.toastMessage,
    "Purchased successfully !",
    toastDisapprearTime,
  );

  cartView.renderNavCount()
  cartView.toggleCart()
  clearCartsState()
  cartView.render();
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
  addToCartView.addAddToCartHandler(controlAddTocartBehaviour);
};
init();
