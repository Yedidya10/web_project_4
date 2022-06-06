import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, { handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  _getInputsValue = () => {
    const inputsValues = {};
    const formInputs = this.popup.querySelectorAll('.form__input');
    for (const input of formInputs) {
      inputsValues[input.name] = input.value;
    }
    console.log(inputsValues);
    return inputsValues;
  };

  _handleSubmitListener = () => {
    this._handleSubmit(this._getInputsValue());
  };

  setEventListeners = () => {
    super.setEventListeners();
    this.popup.querySelector(".form").addEventListener("submit", this._handleSubmitListener);
  };

  removeEventListeners = () => {
    super.removeEventListeners();
    this.popup.querySelector(".form").removeEventListener("submit", this._handleSubmitListener);
  };

  closePopup = () => {
    super.closePopup();
    this.removeEventListeners();
    this.popup.querySelector(".form").reset();
  };
}
