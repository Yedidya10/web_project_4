export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }

  _handleMouseClosePopup = (evt) => {
    if (evt.target === this.popupSelector){
      this.closePopup();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._closePopupButton = this.popupSelector.querySelector('.popup__close');
    this._closePopupButton.addEventListener("click", this.closePopup);
    document.addEventListener("mousedown", this._handleMouseClosePopup);
    document.addEventListener("keydown", this._handleEscClose);
  };

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  openPopup(...args) {
    this.popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  };

  closePopup() {
    this.popupSelector.classList.remove("popup_opened");
    this.removeEventListeners();
  }
}