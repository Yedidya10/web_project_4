export default class Section {
  constructor({ items, renderer }) {
    this._items = items;
    this._renderer = renderer;
    this._cards = document.querySelector(".cards");
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(cardElement) {
    this._cards.prepend(cardElement);
  }
}
