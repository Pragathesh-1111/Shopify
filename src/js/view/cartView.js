import { dom } from "../dom.js";
import { emptyCartHelper } from "../helper.js";

class CartView {
  _parentElement = dom.cartDrawer;

  checkCheckoutValid(list) {
    return list.length > 0
  }

  render(cartItems) {
    document.querySelector(".cart--items").innerHTML = "";

    if (cartItems.length === 0) return this.emptyCart();

    const allCartList = cartItems
      .map((itemObject) => this._cartProductMarkup(itemObject))
      .join("");

    const symbol = cartItems[0].product.symbol
    const subTotal = this.calculateSubTotal(cartItems)

    // Render
    dom.cartItemsSlot.innerHTML = allCartList;
    this.renderSubTotal(subTotal, symbol)
    this._renderNavCount(cartItems);

    return [subTotal, symbol];
  }

  renderSubTotal(total, symbol) {
    dom.subTotal.innerHTML = `${symbol}${(+total).toFixed(2)}`
  }
  renderTotal(total, symbol) {
    dom.total.innerHTML = `${symbol}${(+total).toFixed(2)}`
  }

  calculateSubTotal(cartItems) {
    return cartItems.reduce(
      (acc, cur) => acc + +(cur.product.price * cur.count).toFixed(2),
      0,
    );
  }

  _renderNavCount(cartItems = []) {
    dom.cartNavCount.innerHTML = cartItems.length;
  }

  emptyCart(){
    emptyCartHelper()
    this._renderNavCount()
  }

  _cartProductMarkup(itemObject) {
    return `
        <div class="cart--item" id="${itemObject.product.API}-${itemObject.product.id}">
          <div class="cart--item-image">
            <img src="${itemObject.product.image}" alt="${itemObject.product.title}" />
          </div>
          <div>
            <h3 class="cart--item-name">${itemObject.product.title}</h3>
            <h3 class="cart--item-category">${itemObject.product.category}</h3>
            <div class="cart--item-quantity">
              <button class="cart--item-adjust-btn cart--item-decrease-btn">−</button><span class="cart--item__count">${itemObject.count}</span><button class="cart--item-adjust-btn cart--item-increase-btn">+</button>
            </div>
            </div>
            <p class="cart--item-price"><em>${itemObject.product.symbol}${(+itemObject.product.price * itemObject.count).toFixed(2)}</em></p>
        </div>
    `;
  }

  addHandlerOpenCart(handler) {
    dom.headerNav.addEventListener("click", function (e) {
      const btn = e.target.closest(".cart-btn-container");
      if (!btn) return;
      handler();
    });
  }

  addHandlerCloseCart(handler) {
    [dom.overlay, dom.closeCartBTN].forEach((ev) => {
      ev.addEventListener("click", handler);
    });
  }

  addCheckoutHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".checkout-btn")) return;
      handler();
    });
  }

  cartItemCountHandler(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const product = e.target.closest(".cart--item");
      const btn = e.target.closest(".cart--item-adjust-btn");

      if (!btn || !product) return;

      handler(btn, product);
    });
  }

  adjustCartViewItemCount(adjustedItem) {
    const cartToBeAdjusted = document.querySelector(
      `#${adjustedItem.product.API}-${adjustedItem.product.id}`,
    );
    if (!cartToBeAdjusted) return;

    cartToBeAdjusted.querySelector('.cart--item__count').innerHTML = adjustedItem.count;
    cartToBeAdjusted.querySelector('.cart--item-price em').innerHTML = `${adjustedItem.product.symbol}${(adjustedItem.product.price * adjustedItem.count).toFixed(2)}`
  }

  toggleCart() {
    dom.cartDrawer.classList.toggle("open");
    dom.overlay.classList.toggle("open");
  }
}

export default new CartView();
