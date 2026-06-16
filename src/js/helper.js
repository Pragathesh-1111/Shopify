export const normalizedDummy = function (data, categoryID, ratingSTARS) {
  return data.products.map((product) => {
    return {
      id: product.id,
      API: "DUMMY",
      title: product.title,
      rating: product.rating,
      ratingStars: ratingSTARS[Math.floor(product.rating * 2) / 2],
      reviews: [...product.reviews],
      hashID: categoryID[product.category],
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.images[0],
    };
  });
};

export const normalizedFake = function (data, categoryID, ratingSTARS) {
  return data.map((product) => {
    return {
      id: product.id,
      API: "FAKE",
      hashID: categoryID[product.category],
      title: product.title,
      rating: product.rating.rate,
      ratingStars: ratingSTARS[Math.floor(product.rating.rate * 2) / 2],
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };
  });
};

export const truncateTitle = function (title, limit = 3) {
  const words = title.split(" ");
  if (words.length <= limit) return title;
 
  return words.slice(0, limit).join(" ") + "...";
};

export const normalizeSingleDummy = function (
  product,
  categoryID,
  STARS
) {
  return {
    id: product.id,
    API: "DUMMY",
    title: product.title,
    dataID: categoryID[product.category],
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.images[0],
    ratingStars:
      STARS[
        Math.round(
          product.rating * 2
        ) / 2
      ],
  };
};
export const normalizeSingleFake = function (
  product,
  categoryID,
  STARS
) {
  return {
    id: product.id,
    API: "FAKE",
    title: product.title,
    dataID: categoryID[product.category],
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    ratingStars: STARS[Math.floor(product.rating.rate * 2) / 2],
  };
};

export const renderSpinner = function (parentElement) {
  parentElement.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;
};