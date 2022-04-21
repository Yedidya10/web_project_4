export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardTemplate = this._cardSelector.querySelector(".card").cloneNode(true);
    return cardTemplate;
  }

  createCard = () => {
    this._cardElement = this._getCardTemplate();
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardImageData = {
      src: this._link,
      alt: this._name
    }
    cardImage.setAttribute("src", cardImageData.src);
    cardImage.setAttribute("alt", cardImageData.alt);
    this._cardElement.querySelector(".card__name").textContent = this._name;

    this._setLikeButtonHandler();
    this._setTrashButtonHandler();
    this._sethandleCardClick(cardImage, cardImageData);

    return this._cardElement;
  }

  _sethandleCardClick = (cardImage, cardImageData) => {
    cardImage.addEventListener("click", () => {
      this._handleCardClick(cardImageData);
    });
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
