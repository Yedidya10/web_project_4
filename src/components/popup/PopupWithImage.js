import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  openPopup = (cardImageData) => {
    super.openPopup();
    this.popup.querySelector(".popup__image").src = cardImageData.src;
    this.popup.querySelector(".popup__image").alt = cardImageData.alt;
    this.popup.querySelector(".popup__name").textContent = cardImageData.alt;
  };
}