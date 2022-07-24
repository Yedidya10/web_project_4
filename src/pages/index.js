import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../utils/Api.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupConfirmation from "../components/popup/PopupConfirmation.js";

import {
  settings,
  imagePopup,
  editProfileButton,
  editProfileForm,
  editProfilePopup,
  nameInput,
  aboutInput,
  profileEditImgBtn,
  editProfilePicPopup,
  editProfilePicForm,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  deleteCardPopup
} from "../utils/constants.js";

let userId;

const userInfo = new UserInfo('.profile__name', '.profile__about-me', '.profile__image');
const cardSection = new Section(".cards");

// Getting elements info from the server
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "55231eda-cfe8-472e-9c18-93282af161bd",
    "Content-Type": "application/json"
  }
});

window.addEventListener('load', () => {
  Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserPic(userData.avatar);
    cardsData.forEach((cardData) => {
      cardSection.addItem(createCard(cardData, userId));
    })
  })
  .catch((error) => {
    console.log(`Getting cards return a ${error}`);
  });
});


// Verify forms
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
editProfileFormValidator.enableValidation();
const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
addPlaceFormValidator.enableValidation();
const editProfilePicFormValidator = new FormValidator(settings, editProfilePicForm);
editProfilePicFormValidator.enableValidation();


// Edit Profile
const fillProfileForm = () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
};

editProfileButton.addEventListener("click", () => {
  popupWithEditProfileForm.openPopup();
  fillProfileForm();
  editProfileFormValidator.toggleButtonState();
})

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  handleSubmit: (inputsValues) => {
    const userInfoInputs = {
      name: inputsValues.name,
      about: inputsValues.about,
    };
    popupWithEditProfileForm.showLoading();
    api.updateProfileText(userInfoInputs)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithEditProfileForm.closePopup();
    })
    .catch((error) => {
      console.log(`Getting user return a ${error}`);
    })
    .finally(() => {
      popupWithEditProfileForm.hideLoading();
    });
  },
  loadingButtonText: "Saving..."
});

profileEditImgBtn.addEventListener("click", () => {
  popupWithEditProfilePicForm.openPopup();
  editProfilePicFormValidator.toggleButtonState();
});

const popupWithEditProfilePicForm = new PopupWithForm(editProfilePicPopup, {
  handleSubmit: (inputValue) => {
    const userPicInput = {
      avatar: inputValue.url
    };
    popupWithEditProfilePicForm.showLoading();
    api.updateProfilePic(userPicInput)
    .then((data) => {
      const { avatar } = data;
      userInfo.setUserPic(avatar);
      popupWithEditProfilePicForm.closePopup();
    })
    .catch((error) => {
      console.log(`Getting user return a ${error}`);
    })
    .finally(() => {
      popupWithEditProfilePicForm.hideLoading();
    });
  },
  loadingButtonText: "Saving..."
});


// Adding a card
const popupWithImageView = new PopupWithImage(imagePopup);

addPlaceButton.addEventListener("click", () => {
  popupWithAddPlaceForm.openPopup();
  addPlaceFormValidator.toggleButtonState();
});

const popupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  handleSubmit: (inputsValues) => {
    const cardData = {
      name: inputsValues.title,
      link: inputsValues.url
    };
    popupWithAddPlaceForm.showLoading();
    api.createCard(cardData)
    .then((data) => {
      const cardElement = createCard(data);
      if (data.owner._id === userId) {
        cardElement.querySelector('.card__trash').classList.add('card__trash_active');
      }
      cardSection.addItem(cardElement);
      popupWithAddPlaceForm.closePopup();
    })
    .catch((error) => {
      console.log(`Adding card return a ${error}`);
    })
    .finally(() => {
      popupWithAddPlaceForm.hideLoading();
    });
  },
  loadingButtonText: "Saving..."
});

const popupConfirmDeleteCard = new PopupConfirmation(deleteCardPopup , { loadingButtonText: "Saving..." });

const createCard = (cardData, userId) => {
  const card = new Card(cardData, userId, {
    handleImageCardClick: (cardImageData) => {
      popupWithImageView.openPopup(cardImageData);
      popupWithImageView.setEventListeners();
    },
    handleTrashButtonClick: (cardId) => {
      popupConfirmDeleteCard.setAction(() => {
        popupConfirmDeleteCard.showLoading();
        api.deleteCard(cardId)
        .then(() => {
          card.removeCard();
          popupConfirmDeleteCard.closePopup();
        })
        .catch((error) => {
          console.log(`Deletion card return a ${error}`);
        })
        .finally(() => {
          popupConfirmDeleteCard.hideLoading();
        });
      });
      popupConfirmDeleteCard.openPopup();
    },
    handleLikeButtonClick: (cardId) => {
      if (card.isLiked()) {
        api.deleteLike(cardId)
        .then(response => card.updateLikes(response.likes))
        .catch((error) => {
          console.log(`Deletion card return a ${error}`);
        });
      } else {
        api.addLike(cardId)
        .then(response => card.updateLikes(response.likes))
        .catch((error) => {
          console.log(`Deletion card return a ${error}`);
        });
      }
    }
  });
  return card.createCard();
};