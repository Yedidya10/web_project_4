export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapePopupBtn);
}

export function handleMouseClosePopup(evt) {
  if (evt.target == evt.currentTarget) {
    closeOpenedPopup();
  }
}

export function handleEscapePopupBtn(evt) {
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
