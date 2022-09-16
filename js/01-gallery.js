import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const imageRef = document.querySelector(".gallery__image");

const imagesMarkup = createImagesMarkup(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", imagesMarkup);

function createImagesMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

galleryRef.addEventListener("click", onModalOpenClick);

function onModalOpenClick(event) {
  event.preventDefault();

  const originalImage = event.target.dataset.source;
  const descriptionImage = event.target.alt;

  const showOriginal = basicLightbox.create(
    `<img src="${originalImage}" alt="${descriptionImage}">`
  );

  showOriginal.show();

  galleryRef.addEventListener("keydown", onModalCloseClick);

  function onModalCloseClick(event) {
    if (event.code === "Escape") {
      showOriginal.close();
    }
  }

  if (event.target !== imageRef) {
    return;
  }
}
