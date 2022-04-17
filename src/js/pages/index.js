import "../../css/pages/index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithForm, PopupWithImage } from "../components/Popup.js";
import { initialCards } from "../utils/data/cards.js";
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
} from "../utils/domConst.js";

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
            PopupWithImageView.openPopup(cardImageData);
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
  submitHandler: (evt, data) => {
    evt.preventDefault();

    const card = new Card(cardData, ".card");
    const cardElement = card.createCard();
    newCardsSection.addItem(cardElement);
    PopupWithAddPlaceForm.closePopup();
    addPlaceForm.reset();
  },
});

const PopupWithEditProfileForm = new PopupWithForm(editProfilePopup, {
  submitHandler: (evt, inputsData) => {
    evt.preventDefault();
    profileName.textContent = inputsData.formInput1;
    aboutMe.textContent = inputsData.formInput2;
    PopupWithEditProfileForm.closePopup();
    editProfileForm.reset();
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
