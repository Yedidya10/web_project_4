import { openImagePopup } from "./index.js";
import { cardTemplate } from "./data/domConst.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._template = cardTemplate
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return this._template;
  }

  createCard() {
    this._cardElement = this._getTemplate();
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__name").textContent = this._name;

    cardImage.addEventListener("click", openImagePopup);
    this._setLikeButtonHandler();
    this._setTrashButtonHandler();

    return this._cardElement;
  }

  _handleLike = (evt) => {
    evt.target.classList.toggle("card__like_active");
  };

  _setLikeButtonHandler() {
    const cardLike = this._cardElement.querySelector(".card__like");
    cardLike.addEventListener("click", this._handleLike);
  }

  _handleDelete = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setTrashButtonHandler() {
    const trashButton = this._cardElement.querySelector(".card__trash");
    trashButton.addEventListener("click", this._handleDelete);
  }
}
