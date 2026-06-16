const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

export const dom = {
    heroImage: $('.hero--visual-image'),
    cartBTN: $('.cart-btn'),
    headerNav: $('.header'),
    overlay: $('.cart--overlay'),
    cartDrawer: $('.cart--drawer'),
    closeCartBTN: $('.cart--close'),
    marqueeTrack: $('.marquee-track'),
    categoryParentElement: $('.categories--grid'),
    categoryDivisionParentElement: $('.all-category-divisions'),
    shopSection: $('.shop')
}