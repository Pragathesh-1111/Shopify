import { dom } from "../dom.js";

class Marquee {
  _parentElement = dom.marqueeTrack;

  renderMarquee(items, marqueeSpeed) {
    const markup = [...items, ...items]
      .map((item) => this._getMarkup(item))
      .join("");

    this._parentElement.innerHTML = markup;

    //---------------- WAAPI ----------------//
    requestAnimationFrame(() => {
      const distance = this._parentElement.scrollWidth / 2;
      this._parentElement.getAnimations().forEach((anim) => anim.cancel());

      this._parentElement.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${distance}px)` },
        ],
        {
          duration: marqueeSpeed * 1000,
          easing: "linear",
          iterations: Infinity,
        },
      );
    });
    //---------------------------------------//
  }

  _getMarkup(item) {
    return `<div class="marquee-item">${item}</div>`;
  }
}

export default new Marquee();
