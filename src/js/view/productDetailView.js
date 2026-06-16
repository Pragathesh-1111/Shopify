import { dom } from "../dom.js";
import { renderSpinner } from "../helper.js";
import { convertingMoney, currency} from "../config.js";

class ProductDetailView {
  _parentElement = dom.productDetailElement;
  _productContainer = dom.productDetailContainter

  render(product) {
      this._productContainer.innerHTML = this._productMarkup(product)

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

  closeProductHandler() {
    [dom.singleProductOverlay, dom.productClose].forEach((el) => {
      el.addEventListener("click", this.closeProductDisplay.bind(this));
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
              <span class="product-detail__price--current">${currency.india.symbol}${convertingMoney('india', product.price)}</span>
            </div>

            <p class="product-detail__description">
             ${product.description}
            </p>

            <div class="product-detail__meta">
              <p><strong>Shipping:</strong>Free Delivery</p>
            </div>

            <div class="product-detail__actions">
              <div class="product-detail__quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <button class="btn btn--primary add-to-card-btn">Add to Cart</button>
            </div>
          </div>
    `
  }

  addAddToCartHandler(handler){
    this._productContainer.addEventListener('click', function(e){
        if(!e.target.classList.contains('add-to-card-btn')) return
        handler()
    })
  }

  toastBehavior(){
    dom.toast.classList.remove('hidden')

    setTimeout(() => dom.toast.classList.add('hidden'), 4000)
  }

  _showLoading() {
    renderSpinner(this._productContainer);
  }
}

export default new ProductDetailView();
