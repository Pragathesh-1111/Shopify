import { dom } from "../dom.js";

class CartView {
  addHandlerOpenCart(handler) {
    dom.headerNav.addEventListener("click", function (e) {
        const btn = e.target.closest(".cart-btn-container");
        if (!btn) return;
        handler();
      });
  }

  addHandlerCloseCart(handler) {
    [dom.overlay, dom.closeCartBTN].forEach(ev => {
        ev.addEventListener('click', handler)
    })
  }

  _toggleCart() {
    dom.cartDrawer.classList.toggle('open')
    dom.overlay.classList.toggle('open')
  }

}

export default new CartView();
