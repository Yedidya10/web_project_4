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
  cards
} from "../utils/domConst.js";

const PopupWithAddPlaceForm = new PopupWithForm(addPlacePopup, { submitHandler: new Card(addPlaceData, ".card").createCard });
const PopupWithEditProfileForm = new PopupWithForm(editProfilePopup, settings.formSelector);

addPlaceButton.addEventListener("click", () => {
  PopupWithAddPlaceForm.openPopup();
});

editProfileButton.addEventListener("click", () => {
  PopupWithEditProfileForm.openPopup();
});




const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, ".card");
    card.createCard();
  },
  cards
});

cardSection.addItem();


const profileFormValidator = new FormValidator(settings, editProfileForm);
const cardFormValidator = new FormValidator(settings, addPlaceForm);






// popupList.forEach((popupElement) => {
//   popupElement.addEventListener("mousedown", handleMouseClosePopup);
// });

// closePopupButtonList.forEach((closePopupButton) => {
//   closePopupButton.addEventListener("click", function () {
//     const popup = closePopupButton.closest(".popup");
//     closePopup(popup);
//   });
// });

// export function openImagePopup(evt) {
//   const imageUrl = evt.target.getAttribute("src");
//   const imageAlt = evt.target.getAttribute("alt");
//   const titleCard = evt.target.parentElement.querySelector(".card__name");
//   const name = titleCard.textContent;
//   cardPreviewImage.setAttribute("src", imageUrl);
//   cardPreviewImage.setAttribute("alt", imageAlt);
//   openPopup(imagePopup);
//   cardPreviewTitle.textContent = name;
// }

// editProfileButton.addEventListener("click", function () {
//   openPopup(editProfilePopup);
//   fillProfileForm();
//   profileFormValidator.toggleButtonState();
// });

// function fillProfileForm() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = aboutMe.textContent;
// }

// editProfileForm.addEventListener("submit", handleSubmittedProfile);

// function handleSubmittedProfile() {
//   profileName.textContent = nameInput.value;
//   aboutMe.textContent = jobInput.value;
//   closePopup(editProfilePopup);
// }

// addPlaceForm.addEventListener("submit", handleSubmittedAddPlace);

// function handleSubmittedAddPlace() {


//   addPlaceForm.reset();
//   cardFormValidator.toggleButtonState();
//   closePopup(addPlacePopup);
// }

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();