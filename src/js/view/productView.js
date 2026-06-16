import { SVGs, categoryID } from "../config.js";
import { dom } from "../dom.js";
import { truncateTitle } from "../helper.js";

class ProductView {
  _cardColours = ["bg--white", "bg--black"];
  _categoryElement = dom.categoryParentElement;
  _categoryDivisionElement = dom.categoryDivisionParentElement;
  _grids = {};

  renderCategory(state) {
    // 1) Filtering all possible categories
    const allCategories = [
      ...new Set(state.map((product) => product.category)),
    ];

    const markup = allCategories
      .map((category) => {
        const svg = SVGs[category];
        if (!svg) return;
        return this._categoryMarkup(svg, category);
      })
      .join("");

    this._categoryElement.insertAdjacentHTML("beforeend", markup);
    this._renderCategoryDivision(allCategories);
  }

  addHandlerClicks(handler) {
    this._categoryElement.addEventListener("click", function (e) {
      const element = e.target.closest(".cat--card");
      if (!element) return;
      const hashID = `#${element.dataset.id}`;
      handler(hashID);
    });
  }

  addHandlerProductClicks(handler) {
    this._categoryDivisionElement.addEventListener("click", function (e) {
      const element = e.target.closest(".product--card");
      if (!element) return;

      const [API, id] = element.dataset.id.split("-");
      handler(API, id);
    });
  }

  _renderCategoryDivision(categories) {
    categories.forEach((category) => {
      this._categoryDivisionElement.insertAdjacentHTML(
        "beforeend",
        this._renderCategoryDivisionMarkup(categoryID[category], category),
      );
      this._grids[category] = document.querySelector(
        `#${categoryID[category]} .products--grid`,
      );
    });
  }

  renderProducts(products) {
    const groupedMarkup = {};
    products.forEach((product) => {
      if (!groupedMarkup[product.category])
        groupedMarkup[product.category] = "";
    });

    let current = 0;

    products.forEach((product) => {
      groupedMarkup[product.category] += this._productCardMarkup(
        product,
        current,
      );

      current = (current + 1) % this._cardColours.length;
    });

    // Final render
    Object.entries(groupedMarkup).forEach(([category, markup]) => {
      this._grids[category].insertAdjacentHTML("beforeend", markup);
    });
  }

  _categoryMarkup(svg, title) {
    return `
        <div class="cat--card" data-id="${categoryID[title]}">
          <div class="cat--card-icon">${svg}</div>
          <span class="cat--card-label">${title}</span>
        </div>
    `;
  }
  _renderCategoryDivisionMarkup(id, title) {
    return `
  <div id="${id}" class="category-division">
    <div class="shop--category-division-header">${title}</div>
    <div class="products--grid"></div>
  </div>
  `;
  }
  _productCardMarkup(data, current) {
    return `
        <div class="product--card ${this._cardColours[current]}" data-id="${data.API}-${data.id}">
          <div class="product--card-image">
            <img
              src="${data.image}"
              alt="${data.title}"
            />
          </div>
          <div class="product--card-info">
            <div>
              <p class="product--info-title">${truncateTitle(data.title)}</p>
            </div>
            <div>
              <p class="product--info-rating">${data.ratingStars}</p>
            </div>
          </div>
          <div class="product--overlay"></div>
        </div>
    `;
  }
}

export default new ProductView();
