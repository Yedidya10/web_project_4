import { openImagePopup } from "./utils.js";
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
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._cardImage.addEventListener("click", openImagePopup);
    this._setLikeButtonHandler();
    this._setTrashButtonHandler();

    return this._cardElement;
  }

  

  _setLikeButtonHandler() {
    this._handleLike = function (evt) {
      evt.target.classList.toggle("card__like_active");
    };
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardLike.addEventListener("click", this._handleLike);
  }

  _setTrashButtonHandler() {
    this._cardTrash = this._cardElement.querySelector(".card__trash");
    this._cardTrash.addEventListener("click", function (evt) {
      this._cardElement.remove();
    });
  }
}


