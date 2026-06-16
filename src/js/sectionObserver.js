import { dom } from "./dom.js";

export const handleRevealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    //------ Removed Observer ------//
    observer.unobserve(entry.target);
  });
};

export const observerOptions = {
  root: null,
  threshold: 0,
};