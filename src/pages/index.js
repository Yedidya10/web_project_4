import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupConfirmation from "../components/popup/PopupConfirmation.js";

import {
  apiAuth,
  apiUrl,
  settings,
  imagePopup,
  editProfileButton,
  editProfileForm,
  editProfilePopup,
  userName,
  userAbout,
  userAvatar,
  nameInput,
  aboutInput,
  profileEditImgBtn,
  editProfilePicPopup,
  editProfilePicForm,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  deleteCardPopup
} from "../utils/domConst.js";

const userData = new Api(`${apiUrl}/users/me`, apiAuth, "GET", {
  rendererData: (data) => {
    userName.textContent = data.name;
    userAbout.textContent = data.about;
    userName.setAttribute('id', data._id);
  }
});
userData.fetchApi();

const userInfo = new UserInfo(userName, userAbout, userAvatar);
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addPlaceForm);
cardFormValidator.enableValidation();
const profileEditImgValidator = new FormValidator(settings, editProfilePicForm);
profileEditImgValidator.enableValidation();

const createCard = (cardData) => {
  const card = new Card(cardData, {
    handleImageCardClick: (cardImageData) => {
      const popupWithImageView = new PopupWithImage(imagePopup);
      popupWithImageView.openPopup(cardImageData);
      popupWithImageView.setEventListeners();
    },
    handleTrashButtonClick: (trashButton, cardId, cardElement) => {
      const popupConfirmDeletCard = new PopupConfirmation(deleteCardPopup, {
        handleSubmit: (evt) => {
          evt.preventDefault();
          cardElement.remove();
          cardElement = null;
          const cardDelete = new Api(`${apiUrl}/cards/${cardId}`, apiAuth, "DELETE", {})
          function displaySaving() {
            setTimeout(() => {
              cardDelete.fetchApi();
              popupConfirmDeletCard.closePopup();
            }, 3000)
          }
          displaySaving();
        }
      });
      trashButton.addEventListener("click", () => {
        popupConfirmDeletCard.openPopup();
        popupConfirmDeletCard.setEventListeners();
      });
    },
    handleLikeButtonClick: (evt, likes, cardId, likesAmount) => {
      evt.target.classList.toggle("card__like_active");
      if (evt.target.classList.contains("card__like_active")) {
        const addLike = new Api(`${apiUrl}/cards/likes/${cardId}`, apiAuth, "PUT", {
          rendererData: (data) => {
            likesAmount.textContent = data.likes.length;
          }
        });
        addLike.fetchApi();
      } else {
        const removeLike = new Api(`${apiUrl}/cards/likes/${cardId}`, apiAuth, "DELETE", {
          rendererData: (data) => {
            likesAmount.textContent = data.likes.length;
          }
        });
        removeLike.fetchApi();
      }
    }
  });
  return card.createCard();
};

const cardsData = new Api(`${apiUrl}/cards`, apiAuth, "GET", {
  rendererData: (data) => {
    const newCardsSection = new Section(
      {
        items: data,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          const likesAmount = cardElement.querySelector('.card__likes-amount');
          data.forEach(card => {
            likesAmount.textContent = card.likes.length;
          })
          newCardsSection.addItem(cardElement);
        },
      },
      ".cards"
    );
    newCardsSection.renderItems();
    console.log(data);
  },
});
cardsData.fetchApi();

const newCardSection = new Section(
  {},
  ".cards"
);

const popupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  handleSubmit: (inputsValues) => {
    addPlaceForm.submit.textContent = "Saving...";
    const cardData = {
      name: inputsValues.title,
      link: inputsValues.url
    };
    const newCard = new Api(`${apiUrl}/cards`, apiAuth, "POST", {
      rendererData: (data) => {
        const cardElement = createCard(data);
        const trashBin = cardElement.querySelector('.card__trash');
        if (data.owner._id === userName.id) {
          trashBin.classList.add('card__trash_active');
        }
        newCardSection.addItem(cardElement);
      }
    }, cardData);
    function displaySaving() {
      setTimeout(() => {
        newCard.fetchApi();
        popupWithAddPlaceForm.closePopup();
      }, 3000)
    }
    displaySaving();
  },
});

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  handleSubmit: (inputsValues) => {
    const userInfoInputs = {
      name: inputsValues.name,
      about: inputsValues.about,
    };
    userInfo.fetchUserInfo(userInfoInputs);
    userInfo.setUserInfo();
    popupWithEditProfileForm.closePopup();
  },
});
addPlaceButton.addEventListener("click", () => {
  popupWithAddPlaceForm.openPopup();
  cardFormValidator.toggleButtonState();
});
const popupWithEditProfilePicForm = new PopupWithForm(editProfilePicPopup, {
  handleSubmit: (inputValue) => {
    const userPicInput = {
      avatar: inputValue.url
    };
    userInfo.fetchUserPic(userPicInput);
    userInfo.setUserPic();
    popupWithEditProfilePicForm.closePopup();
  },
});
profileEditImgBtn.addEventListener("click", () => {
  popupWithEditProfilePicForm.openPopup();
  profileEditImgValidator.toggleButtonState();
});

editProfileButton.addEventListener("click", () => {
  popupWithEditProfileForm.openPopup();
  const fillProfileForm = () => {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
  };
  fillProfileForm();
  profileFormValidator.toggleButtonState();
})
