const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

export const dom = {
    closeCartBTN: $('.cart--close'),
    cartBTN: $('.cart-btn'),
    productClose: $('.product-detail__close'),

    toast:$('.toast'),
    toastMessage:$('.toast-message'),
    cartNavCount: $('.cart--nav-count'),

    heroImage: $('.hero--visual-image'),
    headerNav: $('.header'),
    overlay: $('.cart--overlay'),
    cartDrawer: $('.cart--drawer'),
    marqueeTrack: $('.marquee-track'),
    categoryParentElement: $('.categories--grid'),
    categoryDivisionParentElement: $('.all-category-divisions'),
    productDetailElement: $('.product-detail'),
    productDetailContainter: $('.product-detail__container'),
    singleProductOverlay: $('.single--product-overlay'),
    cartItemsSlot: $('.cart--items'),
    subTotal: $('#id--subtotal em'),
    total: $('#id--checkout-total em'),
}