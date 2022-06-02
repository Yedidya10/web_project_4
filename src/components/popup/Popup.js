export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }

  _handleMouseClosePopup = (evt) => {
    if (evt.target === this.popupSelector){
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  setEventListeners = () => {
    this._closePopupButton = this.popupSelector.querySelector('.popup__close');
    this._closePopupButton.addEventListener("click", this.close);
    document.addEventListener("mousedown", this._handleMouseClosePopup);
    document.addEventListener("keydown", this._handleEscClose);
  };

  removeEventListeners = () => {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open = () => {
    this.popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  };

  close = () => {
    this.popupSelector.classList.remove("popup_opened");
    this.removeEventListeners();
  }
}