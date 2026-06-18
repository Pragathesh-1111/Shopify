import { dom } from "../dom.js";
import { renderSpinner } from "../helper.js";

class ProductDetailView {
  _parentElement = dom.productDetailElement;
  _productContainer = dom.productDetailContainter;

  render(product) {
    this._productContainer.innerHTML = this._productMarkup(product);
  }

  openProductDisplay() {
    this._showLoading();
    document.body.classList.add("no-scroll");
    dom.singleProductOverlay.classList.add("open");
    dom.productDetailElement.classList.add("open");
  }

  closeProductDisplay() {
    document.body.classList.remove("no-scroll");
    dom.singleProductOverlay.classList.remove("open");
    dom.productDetailElement.classList.remove("open");
  }

  closeProductHandler(reset) {
    const e = this;
    [dom.singleProductOverlay, dom.productClose].forEach((el) => {
      el.addEventListener("click", function () {
        e.closeProductDisplay();
        reset();
      });
    });
  }

  _productMarkup(product) {
    return `
          <div class="product-detail__gallery">
          <div>
            <img
                src="${product.image}"
                alt="${product.title}"
                class="product-detail__image"
                padding="50px"
            />
          </div>
          </div>

          <div class="product-detail__content">
            <span class="product-detail__category">${product.category}</span>

            <h2 class="product-detail__title">
              ${product.title}
            </h2>

            <div class="product-detail__rating">
              ${product.ratingStars}
            </div>

            <div class="product-detail__price">
              <span class="product-detail__price--old"></span>
              <span class="product-detail__price--current">${product.symbol}${product.price}</span>
            </div>

            <p class="product-detail__description">
             ${product.description}
            </p>

            <div class="product-detail__meta">
              <p><strong>Shipping:</strong>Free Delivery</p>
            </div>

            <div class="product-detail__actions">
              <div class="product-detail__quantity">
                <button class="product-detail-adjust-btn product-detail__reduce-btn">-</button>
                <span class="product-detail__count">1</span>
                <button class="product-detail-adjust-btn product-detail__increase-btn">+</button>
              </div>

              <button class="btn btn--primary add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
    `;
  }

  productCountHandler(handler){
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.product-detail-adjust-btn')
      if(!btn) return
      handler(btn)
    })
  }

  adjustProductViewItemCount(count) {
    document.querySelector('.product-detail__count').innerHTML = count
  }

  _showLoading() {
    renderSpinner(this._productContainer);
  }
}

export default new ProductDetailView();
