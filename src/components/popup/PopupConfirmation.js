import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popup, { handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  _handleSubmitListener = (evt) => {
    this._handleSubmit(evt);
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
  };
}
