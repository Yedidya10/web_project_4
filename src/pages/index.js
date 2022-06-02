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

const popupWithImageView = new PopupWithImage(imagePopup);
const userInfo = new UserInfo(userName, userJob);
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addPlaceForm);
cardFormValidator.enableValidation();

const createCard = (cardData) => {
  const card = new Card(cardData, {
    handleCardClick: (cardImageData) => {
      popupWithImageView.open(cardImageData);
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
  }
);
newCardsSection.renderItems();

const popupWithAddPlaceForm = new PopupWithForm(addPlacePopup, {
  submitHandler: (inputsData) => {
    const createDataObj = () => {
      inputsData["name"] = inputsData["formInput1"];
      delete inputsData["formInput1"];
      inputsData["link"] = inputsData["formInput2"];
      delete inputsData["formInput2"];
      return inputsData;
    };
    const cardData = createDataObj();
    newCardsSection.addItem(createCard(cardData));
    popupWithAddPlaceForm.close();
  },
});
popupWithAddPlaceForm.setEventListeners();

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  submitHandler: (inputsData) => {
    userInfo.setUserInfo(inputsData);
    popupWithEditProfileForm.close();
  },
});
popupWithEditProfileForm.setEventListeners();

addPlaceButton.addEventListener("click", () => {
  popupWithAddPlaceForm.open();
  cardFormValidator.toggleButtonState();
});

editProfileButton.addEventListener("click", () => {
  popupWithEditProfileForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  profileFormValidator.toggleButtonState();
});