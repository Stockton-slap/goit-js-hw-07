import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

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

  if (event.target.nodeName !== "IMG") {
    return;
  }

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
      galleryRef.removeEventListener("keydown", onModalCloseClick);
    }
  }
}
