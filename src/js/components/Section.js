export default class Section {
  constructor({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  renderer = () => {
    this._items.forEach(item => {
      this._renderer(item);
    });
    return this._card;
  }

  addItem = () => {
    this._selector.prepend(this.renderer);
  }
}