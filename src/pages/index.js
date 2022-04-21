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
  popupList,
  imagePopup,
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
  cardTemplate,
} from "../utils/domConst.js";

const userInfo = new UserInfo(profileName, aboutMe);
const profileFormValidator = new FormValidator(settings, editProfileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(settings, addPlaceForm);
cardFormValidator.enableValidation();

const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplate, {
    handleCardClick: (cardImageData) => {
      const popupWithImageView = new PopupWithImage(imagePopup);
      popupWithImageView.openImagePopup(cardImageData);
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
  cards
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
    popupWithAddPlaceForm.closeFormPopup();
  },
});
popupWithAddPlaceForm.setEventListener();

const popupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  submitHandler: (inputsData) => {
    userInfo.setUserInfo(inputsData);
    popupWithEditProfileForm.closePopup();
  },
});
popupWithEditProfileForm.setEventListener();

addPlaceButton.addEventListener("click", () => {
  popupWithAddPlaceForm.openPopup();
});

editProfileButton.addEventListener("click", () => {
  const userInfo = new UserInfo(profileName, aboutMe);
  popupWithEditProfileForm.openPopup();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  profileFormValidator.toggleButtonState();
});