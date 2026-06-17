import { dom } from "../dom.js";

class AddToCart {
  _parentElement = dom.productDetailElement;
  _productContainer = dom.productDetailContainter;

  addAddToCartHandler(handler) {
    this._productContainer.addEventListener("click", function (e) {
      if (!e.target.closest(".add-to-cart-btn")) return;
      handler();
    });
  }

  

  _showLoading() {
    renderSpinner(this._productContainer);
  }
}

export default new AddToCart();
