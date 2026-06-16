import { dom } from "../dom.js"

class ProductDetailView {
    _parentElement = dom.shopSection;

    addHandlerProductClicks(handler){
        this._parentElement.addEventListener('click', function(e) {
            const element = e.target.closest('.product--card')
            if(!element) return;

            const [API, id] = element.dataset.id.split('-')
            handler(API, id)
        })
    }

    toggleProductDisplay() {
        
    }
}

export default new ProductDetailView()