export default class Card {
  constructor(data, userId, { handleImageCardClick, handleTrashButtonClick, handleLikeButtonClick }) {
    this._cardId = data._id;
    this._cardOwner = data.owner._id;
    this._userId = userId;
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

    this._renderLikes();
    this._setLikeButtonHandler();

    this._trashBin = this._cardElement.querySelector('.card__trash');
    if (this._cardOwner === this._userId) {
      this._trashBin.classList.add('card__trash_active');
    }
    this._setTrashButtonHandler();
    this._setHandleImageCardClick(cardImage, cardImageData);

    return this._cardElement;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }

   _renderLikes() {
    const likesAmount = this._cardElement.querySelector('.card__likes-amount');
    likesAmount.textContent = this._likes.length;

    if (this.isLiked()) {
      this._cardElement.querySelector('.card__like').classList.add('card__like_active');
    } else {
      this._cardElement.querySelector('.card__like').classList.remove('card__like_active');
    }
   }

   removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setHandleImageCardClick (cardImage, cardImageData) {
    cardImage.addEventListener("click", () => {
      this._handleImageCardClick(cardImageData);
    });
  }

  _setLikeButtonHandler() {
    const cardLike = this._cardElement.querySelector(".card__like");
    cardLike.addEventListener("click", () => {
      this._handleLikeButtonClick(this._cardId);
    })
  }

  _setTrashButtonHandler() {
    this._trashBin.addEventListener("click", () => this._handleTrashButtonClick(this._cardId));
  }
}