import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  openPopup = (cardImageData) => {
    const imagePopup = this.popup.querySelector(".popup__image");
    super.openPopup();
    imagePopup.src = cardImageData.src;
    imagePopup.alt = cardImageData.alt;
    this.popup.querySelector(".popup__name").textContent = cardImageData.alt;
  };
}