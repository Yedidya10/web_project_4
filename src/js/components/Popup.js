export class Popup {
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

  setEventListeners = () => {
    this._closePopupButton = this.popupSelector.querySelector('.popup__close');
    this._closePopupButton.addEventListener("click", this.closePopup);
    document.addEventListener("mousedown", this._handleMouseClosePopup);
    document.addEventListener("keydown", this._handleEscClose);
  };

  removeEventListeners = () => {
    this._closePopupButton.removeEventListener("click", this.closePopup);
    document.removeEventListener("mousedown", this._handleMouseClosePopup);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  openPopup = () => {
    this.popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  };

  closePopup = () => {
    this.popupSelector.classList.remove("popup_opened");
    this.removeEventListeners();
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValue = () => {
    this.popupSelector.querySelectorAll('.form__input').value;
    return this._submitHandler;
  }

  setEventListener = () => {
    this._formSubmitHandler.addEventListener("submit", this._getInputValue);
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
}