import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (cardImageData) => {
    super.open();
    this.popupSelector.querySelector(".popup__image").src = cardImageData.src;
    this.popupSelector.querySelector(".popup__image").setAttribute("alt", cardImageData.alt);
    this.popupSelector.querySelector(".popup__name").textContent = cardImageData.alt;
  };
}
