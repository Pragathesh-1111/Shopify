import { dom } from "../dom.js";


class CartView {
  _parentElement = dom.cartDrawer;

  render(cartItems) {
    document.querySelector('.cart--items').innerHTML = ''

    if(!cartItems) return

    const allCartList = cartItems.map(itemObject => this._cartProductMarkup(itemObject)).join('')
    document.querySelector('.cart--items').innerHTML = allCartList
  }

  renderNavCount(cartItems = []){
    dom.cartNavCount.innerHTML = cartItems.length
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
          <p class="cart--item-price"><em>2,000&#8377;</em></p>
        </div>
    `
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

  cartItemCountHandler(handler){
    this._parentElement.addEventListener('click', function(e) {
      const product = e.target.closest('.cart--item')
      const btn = e.target.closest('.cart--item-adjust-btn')

      if(!btn || !product) return

      handler(btn, product)
    })
  }

  adjustCartViewItemCount(adjustedItem) {
    const cartToBeAdjusted = document.querySelector(`#${adjustedItem.product.API}-${adjustedItem.product.id} .cart--item__count`)
    if(!cartToBeAdjusted) return

    cartToBeAdjusted.innerHTML = adjustedItem.count
  }

  toggleCart() {
    dom.cartDrawer.classList.toggle("open");
    dom.overlay.classList.toggle("open");
  }
}

export default new CartView();
