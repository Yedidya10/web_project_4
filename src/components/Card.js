export default class Card {
  constructor(data, { handleImageCardClick, handleTrashButtonClick, handleLikeButtonClick }) {
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleImageCardClick = handleImageCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._cardTemplate = document.querySelector("#card-template").content;
  }

  _getCardElement() {
    const cardTemplate = this._cardTemplate.querySelector(".card").cloneNode(true);
    return cardTemplate;
  }

  createCard = () => {
    this._cardElement = this._getCardElement();
    const cardImage = this._cardElement.querySelector(".card__image");
    const cardName = this._cardElement.querySelector(".card__name");
    const cardImageData = {
      src: this._link,
      alt: this._name
    }
    cardImage.setAttribute("src", cardImageData.src);
    cardImage.setAttribute("alt", cardImageData.alt);
    cardName.textContent = this._name;

    this._setLikeButtonHandler();
    this._setTrashButtonHandler();
    this._setHandleImageCardClick(cardImage, cardImageData);

    return this._cardElement;
  }

  _setHandleImageCardClick (cardImage, cardImageData) {
    cardImage.addEventListener("click", () => {
      this._handleImageCardClick(cardImageData);
    });
  }

  _setLikeButtonHandler() {
    const cardLike = this._cardElement.querySelector(".card__like");
    const likesAmount = this._cardElement.querySelector('.card__likes-amount');
    cardLike.addEventListener("click", (evt) => {
      this._handleLikeButtonClick(evt, this._cardId, likesAmount);
    })
  }

  _setTrashButtonHandler() {
    const trashButton = this._cardElement.querySelector(".card__trash");
    trashButton.addEventListener("click", this._handleTrashButtonClick(trashButton, this._cardId, this._cardElement));
  }
}