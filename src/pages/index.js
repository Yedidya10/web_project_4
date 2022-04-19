import "../pages/index.css";

import Section from "../js/components/Section.js";
import Card from "../js/components/Card.js";
import FormValidator from "../js/components/FormValidator.js";
import UserInfo from "../js/components/UserInfo.js";
import { PopupWithForm, PopupWithImage } from "../js/components/Popup.js";
import { initialCards } from "../js/utils/data/cards.js";
import {
  settings,
  popupList,
  imagePopup,
  cardPreviewImage,
  cardPreviewTitle,
  editProfileButton,
  editProfileForm,
  editProfilePopup,
  nameInput,
  jobInput,
  profileName,
  aboutMe,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  addPlaceData,
  formList,
  titleInput,
  urlInput,
  cards,
} from "../js/utils/domConst.js";

const profileFormValidator = new FormValidator(settings, editProfileForm);
const cardFormValidator = new FormValidator(settings, addPlaceForm);


const newCardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, ".card", {
        handleCardClick: (cardImage, cardImageData) => {
          cardImage.addEventListener("click", () => {
            const PopupWithImageView = new PopupWithImage(imagePopup);
            PopupWithImageView.openImagePopup(cardImageData);
          });
        },
      });
      card.createCard();
      cards.prepend(card.createCard());
    },
  },
  cards
);

const PopupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  submitHandler: (evt, inputsData) => {
    evt.preventDefault();
    const data = () => {
      inputsData['name'] = inputsData['formInput1'];
      delete data['formInput1'];
      inputsData['link'] = inputsData['formInput2'];
      delete data['formInput2'];
      return inputsData;
    };
    const cardData = data();
    const card = new Card(cardData, ".card", {
      handleCardClick: (cardImage, cardImageData) => {
        cardImage.addEventListener("click", () => {
          const PopupWithImageView = new PopupWithImage(imagePopup);
          PopupWithImageView.openImagePopup(cardImageData);
        });
      },
    });
    const cardElement = card.createCard();
    newCardsSection.addItem(cardElement);
    PopupWithAddPlaceForm.closeFormPopup();
  },
});

const PopupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  submitHandler: (evt, inputsData) => {
    evt.preventDefault();
    profileName.textContent = inputsData.formInput1;
    aboutMe.textContent = inputsData.formInput2;
    PopupWithEditProfileForm.closePopup();
  },
});

addPlaceButton.addEventListener("click", () => {
  PopupWithAddPlaceForm.openPopup();
  cardFormValidator.enableValidation();
  PopupWithAddPlaceForm.setEventListener();
});

editProfileButton.addEventListener("click", () => {
  const userInfo = new UserInfo(profileName, aboutMe);
  PopupWithEditProfileForm.openPopup();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  profileFormValidator.enableValidation();
  PopupWithEditProfileForm.setEventListener();
});

newCardsSection.renderer();
