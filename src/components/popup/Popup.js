export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }

  _handleMouseClosePopup = (evt) => {
    if (evt.target === this.popup){
      this.closePopup();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._closePopupButton = this.popup.querySelector('.popup__close');
    this._closePopupButton.addEventListener("click", this.closePopup);
    document.addEventListener("mousedown", this._handleMouseClosePopup);
    document.addEventListener("keydown", this._handleEscClose);
  };

  removeEventListeners() {
    this._closePopupButton.removeEventListener("click", this.closePopup);
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleMouseClosePopup);
  }

  openPopup() {
    this.popup.classList.add("popup_opened");
    this.setEventListeners();
  };

  closePopup() {
    this.removeEventListeners();
    this.popup.classList.remove("popup_opened");
  }
}