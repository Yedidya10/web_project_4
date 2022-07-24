import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popup, { loadingButtonText }) {
    super(popup);
    this._submitButton = this.popup.querySelector('.form__submit');
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  setAction(action) {
    this._handleSubmit = action;
  }

  _handleSubmitListener = (evt) => {
    evt.preventDefault();
    this._handleSubmit();
  };

  setEventListeners = () => {
    super.setEventListeners();
    this.popup.querySelector(".form").addEventListener("submit", this._handleSubmitListener);
  };

  removeEventListeners = () => {
    super.removeEventListeners();
    this.popup.querySelector(".form").removeEventListener("submit", this._handleSubmitListener);
  };

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }
}
