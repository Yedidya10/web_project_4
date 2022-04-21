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

  _getInputsValue = () => {
    this._formInputs = this.popupSelector.querySelectorAll('.form__input');
    this._inputsValue = {
      formInput1: this._formInputs[0].value,
      formInput2: this._formInputs[1].value
    };
    return this._inputsValue;
  }

  setEventListener = () => {
    this.popupSelector.querySelector('.form').addEventListener('submit', () => {
      this._inputsData = this._getInputsValue();
      this._submitHandler(this._inputsData);
    });
  }

  closeFormPopup = () => {
    this.closePopup();
    this.popupSelector.querySelector('.form').reset();
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openImagePopup = (cardImageData) => {
    this.openPopup();
    this.popupSelector.querySelector('.popup__image').src = cardImageData.link;
    this.popupSelector.querySelector('.popup__name').textContent = cardImageData.name;
  }
}
