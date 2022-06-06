import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";

import { initialCards } from "../utils/data/cards.js";
import {
  settings,
  imagePopup,
  editProfileButton,
  editProfileForm,
  editProfilePopup,
  userName,
  userJob,
  nameInput,
  jobInput,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
} from "../utils/domConst.js";

const userInfo = new UserInfo(userName, userJob);
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addPlaceForm);
cardFormValidator.enableValidation();

const createCard = (cardData) => {
  const card = new Card(cardData, {
    handleCardClick: (cardImageData) => {
      const popupWithImageView = new PopupWithImage(imagePopup);
      popupWithImageView.openPopup(cardImageData);
      popupWithImageView.setEventListeners();
    },
  });
  return card.createCard();
};

const newCardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      newCardsSection.addItem(cardElement);
    },
  },
  ".cards"
);
newCardsSection.renderItems();

const popupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  handleSubmit: (inputsValues) => {
    const cardData = {
      name: inputsValues.title,
      link: inputsValues.url,
    };
    const cardElement = createCard(cardData);
    newCardsSection.addItem(cardElement);
    popupWithAddPlaceForm.closePopup();
  },
});

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  handleSubmit: (inputsValues) => {
    const userInfoData = {
      name: inputsValues.name,
      job: inputsValues.about,
    };
    userInfo.setUserInfo(userInfoData);
    popupWithEditProfileForm.closePopup();
  },
});

addPlaceButton.addEventListener("click", () => {
  popupWithAddPlaceForm.openPopup();
  cardFormValidator.toggleButtonState();
});

editProfileButton.addEventListener("click", () => {
  popupWithEditProfileForm.openPopup();
  const fillProfileForm = () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
  };
  fillProfileForm();
  profileFormValidator.toggleButtonState();
});