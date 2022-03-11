import {
  popupList,
  closePopupButtonList,
  imagePopup,
  cardPreviewImage,
  cardPreviewTitle
} from "./data/domConst.js";

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapePopupBtn);
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", handleMouseClosePopup);
});

function handleMouseClosePopup(evt) {
  if (evt.target == evt.currentTarget) {
    closeOpenedPopup();
  }
}

function handleEscapePopupBtn(evt) {
  if (evt.key == "Escape") {
    closeOpenedPopup();
  }
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector(".popup_opened");
  closePopup(openedPopup);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapePopupBtn);
}

closePopupButtonList.forEach((closePopupButton) => {
  closePopupButton.addEventListener("click", function () {
    const popup = closePopupButton.closest(".popup");
    closePopup(popup);
  });
});

export function openImagePopup(evt) {
  const imageUrl = evt.target.getAttribute("src");
  const imageAlt = evt.target.getAttribute("alt");
  const titleCard = evt.target.parentElement.querySelector(".card__name");
  const name = titleCard.textContent;
  cardPreviewImage.setAttribute("src", imageUrl);
  cardPreviewImage.setAttribute("alt", imageAlt);
  openPopup(imagePopup);
  cardPreviewTitle.textContent = name;
}
