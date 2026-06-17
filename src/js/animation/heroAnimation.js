class HeroAnimation {
  _imgs = document.querySelectorAll(".hero-img");

  async startRotation(state) {
    const images = state.heroImages;
    console.log(images);
    let current = 0;

    let front = this._imgs[0];
    let back = this._imgs[1];

    // Initial state
    front.src = images[0];
    front.style.opacity = "1";

    while (true) {
      // Stay visible
      await this._sleep(state.heroImageDuration);

      // Next image
      current = (current + 1) % images.length;

      back.src = images[current];

      // Wait until image loads
      await new Promise((resolve) => {
        if (back.complete) return resolve();
        back.onload = resolve;
      });

      // Reset back image
      back.style.opacity = "0";
      back.style.transform = "scale(0.97)";

      // Crossfade
      await Promise.all([
        front.animate(
          [
            {
              opacity: 1,
              transform: "scale(1)",
            },
            {
              opacity: 0,
              transform: "scale(1.03)",
            },
          ],
          {
            duration: state.heroImageFadeDuration,
            easing: "cubic-bezier(0.22,1,0.36,1)",
            fill: "forwards",
          },
        ).finished,

        back.animate(
          [
            {
              opacity: 0,
              transform: "scale(0.97)",
            },
            {
              opacity: 1,
              transform: "scale(1)",
            },
          ],
          {
            duration: state.heroImageFadeDuration,
            easing: "cubic-bezier(0.22,1,0.36,1)",
            fill: "forwards",
          },
        ).finished,
      ]);

      // Prepare for next round
      front.style.opacity = "0";
      back.style.opacity = "1";

      [front, back] = [back, front];
    }
  }

  _sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}
export default new HeroAnimation();
/*
setInterval(async () => {
      //---------- Fade out ----------//
      await this._parentElement.animate(
        [
          { opacity: 1, transform: "scale(1) translateY(0px)" },
          { opacity: 0, transform: "scale(1.04) translateY(-8px)" },
        ],
        {
          duration: state.heroImageFadeDuration,
          fill: "forwards",
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
      ).finished; // Waits till the fade out complete

      //---------- Change image ----------//
      current = (current + 1) % images.length;
      this._parentElement.src = images[current];

      //---------- Fade in ----------//
      this._parentElement.animate(
        [
          { opacity: 0, transform: "scale(0.97) translateY(8px)" },
          { opacity: 1, transform: "scale(1) translateY(0px)" },
        ],
        {
          duration: state.heroImageFadeDuration,
          fill: "forwards",
          easing: "ease",
        },
      );
    }, state.heroImageDuration * 1000);
*/
