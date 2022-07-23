export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
