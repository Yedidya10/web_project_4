export default class FormValidator {
  constructor(settings, formSelector) {
    this._settings = settings;
    this._formSelector = formSelector;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formSelector.querySelector(
      this._settings.submitButtonSelector
    );
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}


