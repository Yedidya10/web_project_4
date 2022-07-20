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
  deleteCardPopup,
  deleteCardForm
} from "../utils/constants.js";
import { data } from "autoprefixer";


// Getting elements info from the server
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "55231eda-cfe8-472e-9c18-93282af161bd",
    "Content-Type": "application/json"
  }
});

window.addEventListener('load', () => {
  // Getting user
api.getUser('users/me')
.then((data) => {
  userName.textContent = data.name;
  userAbout.textContent = data.about;
  userAvatar.src = data.avatar;
  userName.setAttribute('id', data._id);
})
.catch((error) => {
  console.log(`Getting user return a ${error}`);
})

  // Getting cards
  api.getCards('cards')
  .then((data) => {
    const newCardsSection = new Section(
      {
        items: data,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          const trashBin = cardElement.querySelector('.card__trash');
          const likesAmount = cardElement.querySelector('.card__likes-amount');

          if (cardData.owner._id === userName.id) {
            trashBin.classList.add('card__trash_active');
          }
          likesAmount.textContent = cardData.likes.length;
          newCardsSection.addItem(cardElement);
        },
      },
      ".cards"
    );
    newCardsSection.renderItems();
  })
  .catch((error) => {
    console.log(`Getting cards return a ${error}`);
  })
});


// Verify forms
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
editProfileFormValidator.enableValidation();
const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
addPlaceFormValidator.enableValidation();
const editProfilePicFormValidator = new FormValidator(settings, editProfilePicForm);
editProfilePicFormValidator.enableValidation();


// Edit Profile
const userInfo = new UserInfo(userName, userAbout, userAvatar);

editProfileButton.addEventListener("click", () => {
  editProfileForm.submit.textContent = "Save";
  popupWithEditProfileForm.openPopup();
  const fillProfileForm = () => {
    const { name, about } = userInfo.getUserInfo();
    nameInput.value = name;
    aboutInput.value = about;
  };
  fillProfileForm();
  editProfileFormValidator.toggleButtonState();
})

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  handleSubmit: (inputsValues) => {
    editProfileForm.submit.textContent = "Saving...";
    const userInfoInputs = {
      name: inputsValues.name,
      about: inputsValues.about,
    };
    api.updateProfile('users/me', userInfoInputs)
    .then((data) => {
      userName.textContent = data.name;
      userAbout.textContent = data.about;
    })
    .catch((error) => {
      console.log(`Getting user return a ${error}`);
    })
    .finally(() => {
      popupWithEditProfileForm.closePopup();
    });
  },
});

profileEditImgBtn.addEventListener("click", () => {
  editProfilePicForm.submit.textContent = "Save";
  popupWithEditProfilePicForm.openPopup();
  editProfilePicFormValidator.toggleButtonState();
});

const popupWithEditProfilePicForm = new PopupWithForm(editProfilePicPopup, {
  handleSubmit: (inputValue) => {
    editProfilePicForm.submit.textContent = "Saving...";
    const userPicInput = {
      avatar: inputValue.url
    };
    api.updateProfile('users/me/avatar', userPicInput)
    .then((data) => {
      userAvatar.src = data.avatar;
    })
    .catch((error) => {
      console.log(`Getting user return a ${error}`);
    })
    .finally(() => {
      popupWithEditProfilePicForm.closePopup();
    });
  },
});


// Adding a card
const popupWithImageView = new PopupWithImage(imagePopup);

const newCardSection = new Section(
  {},
  ".cards"
);

addPlaceButton.addEventListener("click", () => {
  addPlaceForm.submit.textContent = "Create";
  popupWithAddPlaceForm.openPopup();
  addPlaceFormValidator.toggleButtonState();
});

const popupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  handleSubmit: (inputsValues) => {
    addPlaceForm.submit.textContent = "Saving...";
    const cardData = {
      name: inputsValues.title,
      link: inputsValues.url
    };
    api.createCard('cards', cardData)
    .then((data) => {
      const cardElement = createCard(data);
      const trashBin = cardElement.querySelector('.card__trash');
      if (data.owner._id === userName.id) {
        trashBin.classList.add('card__trash_active');
      }
      newCardSection.addItem(cardElement);
    })
    .catch((error) => {
      console.log(`Adding card return a ${error}`);
    })
    .finally(() => {
      popupWithAddPlaceForm.closePopup();
    });
  },
});

const createCard = (cardData) => {
  const card = new Card(cardData, {
    handleImageCardClick: (cardImageData) => {
      popupWithImageView.openPopup(cardImageData);
      popupWithImageView.setEventListeners();
    },
    handleTrashButtonClick: (trashButton, cardId, cardElement) => {
      const popupConfirmDeletCard = new PopupConfirmation(deleteCardPopup, {
        handleSubmit: (evt) => {
          deleteCardForm.submit.textContent = "Saving...";
          evt.preventDefault();
          api.deleteCard(`cards/${cardId}`)
          .catch((error) => {
            console.log(`Deletion card return a ${error}`);
          })
          .finally(() => {
            cardElement.remove();
            cardElement = null;
            popupConfirmDeletCard.closePopup();
          });
        }
      });
      trashButton.addEventListener("click", () => {
        deleteCardForm.submit.textContent = "Yes";
        popupConfirmDeletCard.openPopup();
        popupConfirmDeletCard.setEventListeners();
      });
    },
    handleLikeButtonClick: (evt, cardId, likesAmount) => {
      const likeActive = evt.target.classList.toggle("card__like_active");
      if (likeActive) {
        api.addLike(`cards/likes/${cardId}`)
        .then((data) => {
          likesAmount.textContent = data.likes.length;
        })
      } else {
        api.deleteLike(`cards/likes/${cardId}`)
        .then((data) => {
          likesAmount.textContent = data.likes.length;
        })
      }
    }
  });
  return card.createCard();
};