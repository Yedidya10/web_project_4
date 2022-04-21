export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(".cards");
  }

  renderItems = () => {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem = (cardElement) => {
    this._selector.prepend(cardElement);
  }
}
