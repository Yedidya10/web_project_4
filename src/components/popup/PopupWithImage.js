import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openImagePopup = (cardImageData) => {
    this.openPopup();
    this.popupSelector.querySelector(".popup__image").src = cardImageData.src;
    this.popupSelector.querySelector(".popup__name").textContent =
      cardImageData.alt;
  };
}
