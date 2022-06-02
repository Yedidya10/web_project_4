import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputsValue = () => {
    this._formInputs = this._popupElement.querySelectorAll('.form__input');
    this._inputsValue = {
      formInput1: this._formInputs[0].value,
      formInput2: this._formInputs[1].value
    };
    return this._inputsValue;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popupElement.querySelector('.form').addEventListener('submit', () => {
      this._inputsData = this._getInputsValue();
      this._submitHandler(this._inputsData);
    });
  }

  close = () => {
    super.close();
    this._popupElement.querySelector('.form').reset();
  }
}